import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { insertLike, deleteLike } from '../services/likes.service';

export const createUserLikedBook = async (
  req: Request<{ bookId: string }>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { bookId } = req.params;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: '로그인이 필요합니다.',
      });
    }

    const result = await insertLike(userId, bookId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const deleteUserLikedBook = async (
  req: Request<{ bookId: string }>,
  res: Response
): Promise<Response> => {
  const { bookId } = req.params;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: '로그인이 필요합니다.',
      });
    }

    const result = await deleteLike(userId, bookId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
