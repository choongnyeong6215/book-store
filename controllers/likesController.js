const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;

  const addLikeQuery =
    "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";

  conn.query(addLikeQuery, [user_id, id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const cancelLike = (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;

  const cancelLikeQuery =
    "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";

  conn.query(cancelLikeQuery, [user_id, id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  addLike,
  cancelLike,
};
