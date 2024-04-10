const express = require("express");
const router = express.Router();

router.post("/:id", (req, res) => res.json("좋아요 추가"));

router.delete("/:id", (req, res) => res.json("좋아요 취소"));

module.exports = router;
