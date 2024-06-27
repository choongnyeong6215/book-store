import express from "express";
import {
  createOrder,
  getOrderDetail,
  getOrderDetailByOrderId,
} from "../controller/orders.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router
  .post("/", verifyToken, createOrder)
  .get("/", verifyToken, getOrderDetail)
  .get("/:orderId", verifyToken, getOrderDetailByOrderId);

export default router;
