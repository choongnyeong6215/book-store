const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrders,
  getOrderDetail,
} = require("../controllers/ordersController");

router.post("/", addOrder);

router.get("/", getOrders);

router.get("/:id", getOrderDetail);

module.exports = router;
