import { RowDataPacket } from "mysql2";
import { pool } from "../db/dbConnection";
import { snakeToCamel } from "../utils/format";

export const findAllCategories = async (): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        SELECT *
        FROM categories
    `;

    const [result] = await conn.execute<RowDataPacket[]>(sql);
    
    const camelCaseResult = snakeToCamel(result);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
