import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findAllCategories } from "../services/categories.service";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const result = await findAllCategories();

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};