import express from "express";
import {
  createUser,
  issueLoginUserToken,
  RequestResetpassword,
  patchUserPassword,
} from "../controller/users.controller";
import { body } from "express-validator";
import { validationErrorChecker } from "../middleware/validation.middleware";

const router = express.Router();

router
  .post("/join", [
    body("email").exists().withMessage("이메일은 필수입니다.").isEmail().withMessage("올바른 이메일 형식을 입력해주세요."),
    body("password").exists().withMessage("비밀번호는 필수입니다.").isLength({min: 3, max: 15}).withMessage("비밀번호는 최소 3, 최대 15자리 입니다.")
  ], validationErrorChecker, createUser)
  .post("/login", [
    body("email").exists().withMessage("이메일은 필수입니다.").isEmail().withMessage("올바른 이메일 형식을 입력해주세요."),
    body("password").exists().withMessage("비밀번호는 필수입니다.")
  ], validationErrorChecker, issueLoginUserToken)
  .post("/reset",[
    body("email").exists().withMessage("이메일은 필수입니다.").isEmail().withMessage("올바른 이메일 형식을 입력해주세요.")
  ], validationErrorChecker, RequestResetpassword)
  .patch("/reset", [
    body("email").exists().withMessage("이메일은 필수입니다.").isEmail().withMessage("올바른 이메일 형식을 입력해주세요."),
    body("password").exists().withMessage("비밀번호는 필수입니다.").isLength({min: 3, max: 15}).withMessage("비밀번호는 최소 3, 최대 15자리 입니다.")
  ], validationErrorChecker, patchUserPassword);

export default router;
