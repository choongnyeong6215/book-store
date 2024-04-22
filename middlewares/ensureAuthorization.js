// 토큰 복호화 모듈
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuthorization = (req) => {
  try {
    const receivedJWT = req.headers["authorization"];

    const decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);

    return decodedJWT;
  } catch (err) {
    console.log(err);

    return err;
  }
};

module.exports = ensureAuthorization;
