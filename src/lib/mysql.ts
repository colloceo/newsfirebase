import mysql from 'mysql2/promise';

export async function query(sql: string, params: any[]) {
  // Check if environment variables are set
  if (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD) {
    throw new Error('Missing MySQL environment variables');
  }

  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    await connection.end();
  }
}
