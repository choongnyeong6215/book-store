const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const join = (req, res) => {
  const { email, password } = req.body;

  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPwd = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  const joinUserQuery =
    "INSERT INTO users(email, password, salt) VALUES(?, ?, ?)";
  const joinUserInfo = [email, hashPwd, salt];

  // 회원가입 시 암호화된 비밀번호, salt 같이 저장
  conn.query(joinUserQuery, joinUserInfo, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const loginUserQuery = "SELECT * FROM users WHERE email = ?";

  conn.query(loginUserQuery, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];

    // 로그인 시 입력한 비밀번호를 salt 값으로 암호화 -> db 비밀번호와 같다면 로그인 성공
    const hashPwd = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === hashPwd) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "5m",
          issuer: "choongnyeong",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      console.log(token);

      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const pwdResetRequest = (req, res) => {
  const { email } = req.body;

  const searchEmailQuery = "SELECT * FROM users WHERE email = ?";

  conn.query(searchEmailQuery, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = results[0];

    if (user) {
      return res.status(StatusCodes.OK).json({
        email,
      });
    } else {
      return res.stats(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const pwdReset = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(10).toString("base64");
  const hassPwd = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
    .toString("base64");

  const updatePwdQuery =
    "UPDATE users SET password = ?, salt = ? WHERE email = ?";
  const values = [hassPwd, salt, email];

  conn.query(updatePwdQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};

module.exports = {
  join,
  login,
  pwdResetRequest,
  pwdReset,
};
