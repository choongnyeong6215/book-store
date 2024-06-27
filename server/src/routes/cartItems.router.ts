import express from "express";
import {
  createCartItem,
  deleteCartItemByItemId,
  getCartItems,
} from "../controller/cartItems.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router
  .post("/", verifyToken, createCartItem)
  .get("/", verifyToken, getCartItems)
  .delete("/:cartItemId", verifyToken, deleteCartItemByItemId);

export default router;
