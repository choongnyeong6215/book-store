const express = require("express");
const router = express.Router();
const { addLike, cancelLike } = require("../controllers/likesController");

router.route("/:bookId").post(addLike).delete(cancelLike);

module.exports = router;
