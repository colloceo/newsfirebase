
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  tls: false,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  console.error('MONGO DB URI NOT SET');
  // Dummy promise to prevent app crash
  clientPromise = new Promise(() => {});
} else {
    if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    // @ts-ignore
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        // @ts-ignore
        global._mongoClientPromise = client.connect();
    }
    // @ts-ignore
    clientPromise = global._mongoClientPromise;
    } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    }
}


export async function getClient(): Promise<MongoClient> {
  return clientPromise;
}
