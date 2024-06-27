import { RowDataPacket } from "mysql2";
import { pool } from "../db/dbConnection";

export const findAllCategories = async (): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        SELECT *
        FROM categories
    `;

    const [results] = await conn.execute<RowDataPacket[]>(sql);

    return results;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
