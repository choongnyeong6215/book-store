import express from "express";
import {
  createUser,
  issueLoginUserToken,
  RequestResetpassword,
  patchUserPassword,
} from "../controller/users.controller";

const router = express.Router();

router
  .post("/join", createUser)
  .post("/login", issueLoginUserToken)
  .post("/reset", RequestResetpassword)
  .patch("/reset", patchUserPassword);

export default router;
