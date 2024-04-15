const express = require("express");
const router = express.Router();
const { addLike, cancelLike } = require("../controllers/likesController");

router.post("/:id", addLike);

router.delete("/:id", cancelLike);

module.exports = router;
