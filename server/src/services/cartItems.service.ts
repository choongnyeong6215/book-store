import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db/dbConnection";
import { snakeToCamel } from "../utils/format";

export const insertCartItem = async (
  bookId: number,
  quantity: number,
  userId: string
): Promise<ResultSetHeader> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)
    `;
    const values = [bookId, quantity, userId];

    const [result] = await conn.execute<ResultSetHeader>(sql, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findCartItems = async (
  userId: string
): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        SELECT c.id, c.book_id, b.title, b.summary, c.quantity, b.price
        FROM cartItems c
        LEFT JOIN books b
        ON c.book_id = b.id
        WHERE c.user_id = ?
    `;
    const values = [userId];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    const camelCaseResult = snakeToCamel(result);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findSelectedCartItems = async (
  userId: string,
  selectedCartItems: number[]
): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const placeHolders = selectedCartItems.map(() => "?").join(",");
    const sql = `
          SELECT c.id, c.book_id, b.title, b.summary, c.quantity, b.price
          FROM cartItems c
          LEFT JOIN books b
          ON c.book_id = b.id
          WHERE c.user_id = ?
          AND c.id IN (${placeHolders})
      `;
    const values = [userId, ...selectedCartItems];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    const camelCaseResult = snakeToCamel(result);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const deleteCartItem = async (cartItemId: string, userId: string): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
        DELETE
        FROM cartItems
        WHERE id = ?
        AND user_id = ?
    `;
    const values = [String(cartItemId), userId];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
