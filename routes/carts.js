const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartsController");

router.post("/", addToCart);

router.get("/", getCartItems);

router.delete("/:cartItemId", deleteCartItem);

router.get("/", (req, res) =>
  res.json("장바구니에서 선택한 주문 예상 상품 조회")
);

module.exports = router;
