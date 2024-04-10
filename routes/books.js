const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json("전체 도서 조회"));

router.get("/:id", (req, res) => res.json("개별 도서 조회"));

router.get("/", (req, res) => res.json("전체 도서 조회"));

module.exports = router;
