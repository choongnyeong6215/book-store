const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
  const { category_id } = req.query;

  if (category_id) {
    const booksByCategoryQuery = "SELECT * FROM books WHERE category_id = ?";

    conn.query(booksByCategoryQuery, category_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length) {
        res.status(StatusCodes.OK).json(results);
      } else {
        res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  } else {
    const allBooksQuery = "SELECT * FROM books";

    conn.query(allBooksQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      res.status(StatusCodes.OK).json(results);
    });
  }
};

const bookDetail = (req, res) => {
  const { id } = req.params;

  const bookDeatailQuery = "SELECT * FROM books WHERE id = ?";

  conn.query(bookDeatailQuery, id, (err, results) => {
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
