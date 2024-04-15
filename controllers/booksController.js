const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

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
  const { user_id } = req.body;
  const book_id = req.params.id;

  const bookDeatailQuery = `SELECT *,
        (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes, 
        (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
         FROM books LEFT OUTER JOIN categories ON books.category_id=categories.category_id WHERE books.id=?`;

  conn.query(bookDeatailQuery, [user_id, book_id, book_id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0]) {
      res.status(StatusCodes.OK).json(...results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
