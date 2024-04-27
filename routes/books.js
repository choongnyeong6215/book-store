const express = require("express");
const router = express.Router();
const { allBooks, bookDetail } = require("../controllers/booksController");

router.get("/", allBooks); // 카테고리, 신간 여부 존재에 따라 도서 목록 조회

router.get("/:bookId", bookDetail); // 개별 도서 조회

module.exports = router;
