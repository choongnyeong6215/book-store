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

module.exports = router;
