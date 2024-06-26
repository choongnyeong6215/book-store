import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IPayload } from "../types/jwt";

dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const receivedToken = req.headers.authorization;

    // 토큰 존재유무 확인
    if (!receivedToken) return next();

    const payload = jwt.verify(
      receivedToken,
      process.env.ACCESS_TOKEN_KEY as string
    ) as IPayload;

    req.payload = payload;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인 세션이 만료되었습니다.",
      });
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
