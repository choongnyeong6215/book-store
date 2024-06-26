import mysql2, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const createConnection = async (): Promise<Connection> => {
  const conn = await mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    timezone: "+09:00",
    database: process.env.DATABASE_DATABASE,
    dateStrings: true,
  });

  return conn;
};

export const pool = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  timezone: "+09:00",
  database: process.env.DATABASE_DATABASE,
  dateStrings: true,
  connectionLimit: 50,
});
