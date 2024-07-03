import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  insertUser,
  findUser,
  findUserByEmail,
  updateUserPassword,
} from "../services/users.service.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { IUserRequestBody } from "../models/users.model";

export const createUser = async (
  req: Request<{}, {}, IUserRequestBody>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;

  try {
    const result = await insertUser(email, password);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const issueLoginUserToken = async (
  req: Request<{}, {}, IUserRequestBody>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;

  try {
    const result = await findUser(email);

    const loginUser = result[0];

    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === hashPassword) {
      const token = jwt.sign(
        {
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.ACCESS_TOKEN_KEY as string,
        {
          expiresIn: "1h",
          issuer: "leeee",
        }
      );

      res.cookie("token", token, { httpOnly: true });

      return res.status(StatusCodes.OK).json({
        id: loginUser.id,
        email: loginUser.email,
        token,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const RequestResetpassword = async (
  req: Request<{}, {}, Omit<IUserRequestBody, "password">>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email } = req.body;
  try {
    const result = await findUserByEmail(email);

    if (result.length === 0) {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    } else {
      return res.status(StatusCodes.OK).json({
        email: result[0].email,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const patchUserPassword = async (
  req: Request<{}, {}, IUserRequestBody>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { email, password } = req.body;

  try {
    const result = await updateUserPassword(email, password);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
