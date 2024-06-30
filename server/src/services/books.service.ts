import { pool } from '../db/dbConnection';
import { RowDataPacket } from 'mysql2';
import { IBookResponse, IsearchAllBooksResponse } from '../models/books.model';
import { snakeToCamel } from '../utils/format';

export const findAllBooks = async (
  listNum?: number,
  currentPage?: number,
  categoryId?: number,
  isNewRelease?: string,
): Promise<{
  books: IBookResponse[];
  totalBooksQunatity: number;
}> => {
  const conn = await pool.getConnection();

  try {
    // 전체 도서 수
    let findAllBooksQuantityQuery = `
      SELECT COUNT(*) AS count
      FROM books
    `;
    let findAllBooksQuantityValues: (string | number)[] = [];

    if (categoryId && isNewRelease === 'true') {
      findAllBooksQuantityQuery += ` 
        WHERE category_id = ?
        AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
      `;
      findAllBooksQuantityValues.push(categoryId);
    } else if (categoryId) {
      findAllBooksQuantityQuery += ` 
        WHERE category_id = ?
      `;
      findAllBooksQuantityValues.push(categoryId);
    } else if (isNewRelease === 'true') {
      findAllBooksQuantityQuery += ` 
        WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
      `;
    }
    const [findAllBooksQuantityResult] = await conn.execute<RowDataPacket[]>(
      findAllBooksQuantityQuery,
      findAllBooksQuantityValues
    );

    const totalBooksQunatity: number = findAllBooksQuantityResult[0].count;

    // 전체 도서
    let findAllBooksQuery = `
      SELECT *,
      (SELECT COUNT(*) FROM likes WHERE liked_book_id = books.id) AS likes
      FROM books
    `;
    const values: (string | number)[] = [];

    // 카테고리별 신간
    if (categoryId && isNewRelease === 'true') {
      findAllBooksQuery += ` 
        WHERE category_id = ?
        AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
      `;
      values.push(categoryId);
    }

    // 카테고리별 전체 도서
    else if (categoryId) {
      findAllBooksQuery += ` 
        WHERE category_id = ?
      `;
      values.push(categoryId);
    }

    // 신간
    else if (isNewRelease === 'true') {
      findAllBooksQuery += ` 
        WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
      `;
    }

    // 페이지네이션
    if (listNum && currentPage) {
      const limit = Number(listNum);
      const offset = (Number(currentPage) - 1) * limit;

      findAllBooksQuery += `
      LIMIT ? OFFSET ?
    `;

      values.push(String(limit), String(offset));
    }

    const [result] = await conn.execute<IsearchAllBooksResponse[]>(
      findAllBooksQuery,
      values
    );

    const camelCaseResult = result.map((book) => snakeToCamel(book)) as IBookResponse[];

    return { books: camelCaseResult, totalBooksQunatity };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findBook = async (
  userId: string,
  bookId: string
): Promise<RowDataPacket | null> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
      SELECT *,
      (SELECT COUNT(*) FROM likes WHERE liked_book_id = b.id) AS likes,
      (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
      FROM books b
      LEFT JOIN categories c
      ON b.category_id = c.category_id
      WHERE b.id = ?
    `;
    const values = [userId, bookId, bookId];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);

    const camelCaseResult = snakeToCamel(result[0]);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

export const findBookExceptLiked = async (
  bookId: string
): Promise<RowDataPacket | null> => {
  const conn = await pool.getConnection();

  try {
    const sql = `
      SELECT *,
      (SELECT COUNT(*) FROM likes WHERE liked_book_id = b.id) AS likes
      FROM books b
      LEFT JOIN categories c
      ON b.category_id = c.category_id
      WHERE b.id = ?
    `;
    const values = [bookId];

    const [result] = await conn.execute<RowDataPacket[]>(sql, values);
  
    const camelCaseResult = snakeToCamel(result[0]);

    return camelCaseResult;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
