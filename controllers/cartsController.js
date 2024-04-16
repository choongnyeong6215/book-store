const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

// 장바구니 담기
const addToCart = (req, res) => {
  const { bookId, quantity, userId } = req.body;

  const addCartItemsQuery =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";

  conn.query(addCartItemsQuery, [bookId, quantity, userId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

// 장바구니 아이템 목록 / 장바구니에서 선택한 아이템 목록 조회
const getCartItems = (req, res) => {
  const { userId, selected } = req.body;

  const getCartItemsQuery = `
    SELECT c.id, b.id, b.title, b.summary, b.quantity, b.price 
    FROM cartItems c
    LEFT JOIN books b
    ON c.book_id = b.id
    WHERE c.user_id = ?
    AND c.id IN (?)
    `;

  conn.query(getCartItemsQuery, [userId, selected], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

// 장바구니 아이템 삭제
const deleteCartItem = (req, res) => {
  const { cartItemId } = req.params;

  const deleteCartItemsQuery = "DELETE FROM cartItems WHERE id = ?";

  conn.query(deleteCartItemsQuery, cartItemId, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
