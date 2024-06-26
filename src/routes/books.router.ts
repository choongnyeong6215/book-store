import express from "express";
import { getAllBooks, getBook } from "../controller/books.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:bookId", verifyToken, getBook);

export default router;
