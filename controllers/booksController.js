const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../middlewares/ensureAuthorization");
const jwt = require("jsonwebtoken");

// 카테고리, 신간 여부 존재에 따라 도서 목록 조회
const allBooks = (req, res) => {
  const { category_id, recent_books, limit, currentPage } = req.query;

  /*
   * limit : page별 도서 수               ex) 3
   * currentPage : 현재 위치한 페이지       ex) 1, 2, 3 ...
   * offset: limit * (currentPage - 1)  ex) 1페이지 : (3 * (1 - 1)) = 0, 2페이지 : (3 * (2 - 1)) = 3, 3페이지 : (3 * (3 - 1)) = 6 ...
   */

  let offset = limit * (currentPage - 1);

  let query =
    "SELECT *, (SELECT COUNT(*) FROM likes WHERE liked_book_id = books.id) AS likes FROM books";
  let values = [];

  if (category_id && recent_books) {
    query += ` WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
    values = [category_id];
  } else if (category_id) {
    query += ` WHERE category_id = ?`;
    values = [category_id];
  } else if (recent_books) {
    query += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`;
  }

  query += ` LIMIT ? OFFSET ?`;

  values = [...values, Number(limit), offset];

  conn.query(query, values, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const bookDetail = (req, res) => {
  const auth = ensureAuthorization(req);

  // TokenExpiredError
  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다.",
    });
  }
  // JsonWebTokenError
  else if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }
  // 로그인 상태가 아니면 좋아요 여부 제외해 응답
  else if (auth instanceof ReferenceError) {
    const book_id = req.params.id;

    const bookDeatailQuery = `
      SELECT *,
      (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes
      FROM books
      LEFT OUTER JOIN categories
      ON books.category_id=categories.category_id 
      WHERE books.id=?
    `;

    const values = [book_id];

    conn.query(bookDeatailQuery, values, (err, results) => {
      if (err) {
        console.log(err.name);
        console.log(err.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results[0]) {
        return res.status(StatusCodes.OK).json(...results);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  }
  // 로그인 상태라면 좋아요 여부 포함해서 응답
  else {
    const book_id = req.params.id;

    const bookDeatailQuery = `
      SELECT *,
      (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
      (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
      FROM books
      LEFT OUTER JOIN categories
      ON books.category_id=categories.category_id
      WHERE books.id=?
    `;

    const values = [auth.id, book_id, book_id];

    conn.query(bookDeatailQuery, values, (err, results) => {
      if (err) {
        console.log(err.name);
        console.log(err.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results[0]) {
        return res.status(StatusCodes.OK).json(...results);
      } else {
        return res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  }
};

module.exports = {
  allBooks,
  bookDetail,
};
