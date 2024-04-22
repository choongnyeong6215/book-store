const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../middlewares/ensureAuthorization");
const checkTokenError = require("../middlewares/checkToeknError");

// 장바구니 담기
const addToCart = (req, res) => {
  const { bookId, quantity } = req.body;
  const auth = ensureAuthorization(req);

  if (!checkTokenError(auth, res)) {
    const addCartItemsQuery =
      "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";

    conn.query(
      addCartItemsQuery,
      [bookId, quantity, auth.id],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
      }
    );
  }
};

// 장바구니 아이템 목록 / 장바구니에서 선택한 아이템 목록 조회
const getCartItems = (req, res, next) => {
  const { selected } = req.body;
  const auth = ensureAuthorization(req);

  if (!checkTokenError(auth, res)) {
    const getCartItemsQuery = `
    SELECT c.id, b.id, b.title, b.summary, c.quantity, b.price 
    FROM cartItems c
    LEFT JOIN books b
    ON c.book_id = b.id
    WHERE c.user_id = ?
    AND c.id IN (?)
    `;

    conn.query(getCartItemsQuery, [auth.id, selected], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.OK).json(results);
    });
  }
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
