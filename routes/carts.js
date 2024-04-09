const express = require("express");
const router = express.Router();

router.post("/", (req, res) => res.json("장바구니 담기"));

router.get("/", (req, res) => res.json("장바구니 조회"));

router.delete("/:id", (req, res) => res.json("장바구니 도서 삭제"));

// 추후 구현 예정
// router.get("/", (req, res) =>
//   res.json("장바구니에서 선택한 주문 예상 상품 조회")
// );

module.exports = router;
