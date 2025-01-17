import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  findAllBooks,
  findBook,
  findBookExceptLiked,
} from "../services/books.service";
import {
  IBookRequestQueryString,
  IBookResponseWithPagination,
} from "../models/books.model";

export const getAllBooks = async (
  req: Request<{}, {}, {}, IBookRequestQueryString>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { categoryId, isNewRelease, listNum, currentPage } = req.query;

  try {
    // isNewRelease true일 경우 신간으로 간주
    if (isNewRelease && isNewRelease !== "true") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "신간 여부 쿼리스트링은 오직 'true'만 사용합니다.",
      });
    }

    // currentPage는 항상 1 이상
    if (Number(currentPage) < 1) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "첫 페이지는 최소 1페이지입니다.",
      });
    }

    const { books, totalBooksQuantity } = await findAllBooks(
      listNum,
      currentPage,
      categoryId,
      isNewRelease
    );

    if (!books.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        mesage: "도서를 찾을 수 없습니다.",
      });
    }

    const result: IBookResponseWithPagination = {
      books,
      pagination: {
        currentPage: currentPage ? Number(currentPage) : 1,
        totalBooksQuantity: Number(totalBooksQuantity),
      },
    };

    return result
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({
          message: "도서를 찾을 수 없습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const getBook = async (
  req: Request<{ bookId: string }>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { bookId } = req.params;

  try {
    const userId = req.payload?.id;

    let result;

    // 로그인 한 경우 (좋아요 여부 포함)
    if (userId) result = await findBook(userId, bookId);
    // 로그인 안한 경우 (좋아요 여부 제외)
    else result = await findBookExceptLiked(bookId);

    return result
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({
          message: "도서를 찾을 수 없습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
