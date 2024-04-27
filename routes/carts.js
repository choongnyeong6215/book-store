const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartsController");

router.route("/").post(addToCart).get(getCartItems);

router.delete("/:cartItemId", deleteCartItem);

module.exports = router;
