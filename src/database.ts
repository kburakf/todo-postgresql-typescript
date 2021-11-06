import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});