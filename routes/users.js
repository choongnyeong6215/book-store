const express = require("express");
const router = express.Router();
const {
  join,
  login,
  pwdResetRequest,
  pwdReset,
} = require("../controllers/usersController");

router.post("/join", join);

router.post("/login", login);

router.route("/reset").post(pwdResetRequest).put(pwdReset);

module.exports = router;
