'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allCategories, Article } from '@/lib/data';
import { Save, LoaderCircle, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveArticle, FormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firebase';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

interface ArticleFormProps {
  article?: Article;
}

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton({ isEditing, isUploading }: { isEditing: boolean, isUploading: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isUploading;

  return (
    <Button type="submit" disabled={isDisabled}>
      {isDisabled ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      {isUploading ? 'Uploading...' : (isEditing ? 'Save Changes' : 'Publish Article')}
    </Button>
  );
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(saveArticle, initialState);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(article?.imageUrl || null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast({ title: "Success", description: state.message });
      router.push('/admin/articles');
    } else if (state.message && !state.success) {
       toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, router, toast]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (imageFile) {
      setIsUploading(true);
      const storageRef = ref(storage, `articles/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast({ variant: "destructive", title: "Upload Error", description: "Image upload failed. Please try again." });
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          formData.set('imageUrl', downloadURL);
          formAction(formData);
          setIsUploading(false);
        }
      );
    } else {
      // If no new image, just submit the form
      formAction(formData);
    }
  };

  return (
    <form action={handleFormSubmit}>
      {article && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="imageUrl" value={article?.imageUrl || ''} />

      <Card>
        <CardHeader>
          <CardTitle>{article ? 'Edit Article Details' : 'New Article Details'}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={article?.title} placeholder="Enter article title" required />
            {state.errors?.title && <p className="text-sm font-medium text-destructive">{state.errors.title.join(', ')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={article?.category} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             {state.errors?.category && <p className="text-sm font-medium text-destructive">{state.errors.category.join(', ')}</p>}
          </div>
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea id="summary" name="summary" defaultValue={article?.summary} placeholder="Enter a brief summary" required/>
             {state.errors?.summary && <p className="text-sm font-medium text-destructive">{state.errors.summary.join(', ')}</p>}
          </div>
          
           <div className="space-y-2 md:col-span-2">
            <Label htmlFor="imageUpload">Article Image</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 relative bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                {imageUrl ? (
                  <Image src={imageUrl} alt="Article preview" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Preview</div>
                )}
              </div>
              <div className="w-full">
                 <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="file:text-primary file:font-semibold" />
                 <p className="text-xs text-muted-foreground mt-1">Upload a new image to replace the existing one.</p>
                 {isUploading && <Progress value={uploadProgress} className="mt-2" />}
              </div>
            </div>
             {state.errors?.imageUrl && <p className="text-sm font-medium text-destructive">{state.errors.imageUrl.join(', ')}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageHint">Image Hint (for AI)</Label>
            <Input id="imageHint" name="imageHint" defaultValue={article?.imageHint} placeholder="e.g. 'political debate'" required/>
            {state.errors?.imageHint && <p className="text-sm font-medium text-destructive">{state.errors.imageHint.join(', ')}</p>}
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" name="featured" defaultChecked={article?.featured} className="h-4 w-4" />
                <Label htmlFor="featured">Featured</Label>
              </div>
               <div className="flex items-center space-x-2">
                <input type="checkbox" id="trending" name="trending" defaultChecked={article?.trending} className="h-4 w-4"/>
                <Label htmlFor="trending">Trending</Label>
              </div>
               <div className="flex items-center space-x-2">
                <input type="checkbox" id="breaking" name="breaking" defaultChecked={article?.breaking} className="h-4 w-4"/>
                <Label htmlFor="breaking">Breaking</Label>
              </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton isEditing={!!article} isUploading={isUploading} />
        </CardFooter>
      </Card>
    </form>
  );
}
