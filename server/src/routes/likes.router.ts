import express from "express";
import {
  createUserLikedBook,
  deleteUserLikedBook,
} from "../controller/likes.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router
  .post("/:bookId", verifyToken, createUserLikedBook)
  .delete("/:bookId", verifyToken, deleteUserLikedBook);

export default router;
