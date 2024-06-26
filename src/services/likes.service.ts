import { ResultSetHeader } from "mysql2";
import { pool } from "../db/dbConnection";

export const insertLike = async (
  userId: string,
  bookId: string
): Promise<ResultSetHeader> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        INSERT INTO likes(user_id, liked_book_id) VALUES (?, ?);
    `;
    const values = [userId, bookId];

    const [results] = await conn.execute<ResultSetHeader>(sql, values);

    return results;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const deleteLike = async (
  userId: string,
  bookId: string
): Promise<ResultSetHeader> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
      DELETE
      FROM likes
      WHERE user_id = ?
      AND liked_book_id = ?
    `;
    const values = [userId, bookId];

    const [result] = await conn.execute<ResultSetHeader>(sql, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
