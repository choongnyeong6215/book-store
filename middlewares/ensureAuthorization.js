// 토큰 복호화 모듈
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureAuthorization = (req) => {
  try {
    const receivedJWT = req.headers["authorization"];

    console.log(`receivedJWT : ${receivedJWT}`);

    if (receivedJWT) {
      const decodedJWT = jwt.verify(receivedJWT, process.env.PRIVATE_KEY);

      return decodedJWT;
    }
    // 토큰 없는 경우 고려
    else {
      throw new ReferenceError("jwt must be provided");
    }
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    return err;
  }
};

module.exports = ensureAuthorization;
