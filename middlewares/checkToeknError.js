// 토큰 예외처리 모듈
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const checkTokenError = (auth, res) => {
  // TokenExpiredError
  if (auth instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다.",
    });
  }

  // JsonWebTokenError
  if (auth instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }

  return false;
};

module.exports = checkTokenError;
