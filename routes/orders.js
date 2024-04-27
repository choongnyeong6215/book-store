const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrders,
  getOrderDetail,
} = require("../controllers/ordersController");

router.route("/").post(addOrder).get(getOrders);

router.get("/:orderId", getOrderDetail);

module.exports = router;
