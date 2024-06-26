import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db/dbConnection";
import crypto from "crypto";

export const insertUser = async (
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const conn = await pool.getConnection();

  try {
    const salt: string = crypto.randomBytes(10).toString("base64");
    const hashPassword: string = crypto
      .pbkdf2Sync(password, salt, 10000, 10, "sha512")
      .toString("base64");

    const sql = `
        INSERT INTO users (email, password, salt) VALUES (?, ?, ?)
      `;
    const values = [email, hashPassword, salt];

    const [result] = await conn.execute<ResultSetHeader>(sql, values);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findUser = async (email: string): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
      SELECT *
      FROM users
      WHERE email = ?`;

    const [result] = await conn.execute<RowDataPacket[]>(sql, [email]);

    return result;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findUserByEmail = async (
  email: string
): Promise<RowDataPacket[]> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
      SELECT *
      FROM users
      WHERE email = ?
    `;

    const [results] = await conn.execute<RowDataPacket[]>(sql, [email]);

    return results;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const updateUserPassword = async (
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const conn = await pool.getConnection();

  try {
    const salt = crypto.randomBytes(10).toString("base64");

    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 10, "sha512")
      .toString("base64");

    const sql = `
        UPDATE users
        SET password = ?,
        salt = ?
        WHERE email = ?
      `;

    const values = [hashPassword, salt, email];

    const [results] = await conn.execute<ResultSetHeader>(sql, values);

    return results;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
