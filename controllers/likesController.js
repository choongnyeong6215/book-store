const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../middlewares/ensureAuthorization");
const checkTokenError = require("../middlewares/checkToeknError");

const addLike = (req, res) => {
  const bookId = req.params.id;
  const auth = ensureAuthorization(req);

  if (!checkTokenError(auth, res)) {
    const addLikeQuery =
      "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";

    conn.query(addLikeQuery, [auth.id, bookId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const cancelLike = (req, res) => {
  const bookId = req.params.id;
  const auth = ensureAuthorization(req);

  if (!checkTokenError(auth, res)) {
    const cancelLikeQuery =
      "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";

    conn.query(cancelLikeQuery, [auth.id, bookId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  }
};

module.exports = {
  addLike,
  cancelLike,
};
