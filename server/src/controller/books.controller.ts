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
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    // currentPage는 항상 1 이상
    if (Number(currentPage) < 1) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "첫 페이지는 최소 1페이지입니다.",
      });
    }

    const { books, totalBooksQunatity } = await findAllBooks(
      categoryId,
      isNewRelease,
      listNum,
      currentPage
    );

    if (!books.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        mesage: "도서를 찾을 수 없습니다.",
      });
    }

    const responseData: IBookResponseWithPagination = {
      books,
      pagination: {
        currentPage: Number(currentPage),
        totalBooksQunatity: Number(totalBooksQunatity),
      },
    };

    // const camelCaseResponseData = camelcaseKeys(
    //   responseData as Record<string, unknown>,
    //   { deep: true }
    // );

    return responseData
      ? res.status(StatusCodes.OK).json(responseData)
      : res.status(StatusCodes.NOT_FOUND).end();
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

    // const camelCaseResponseData = camelcaseKeys(
    //   result as Record<string, unknown>[],
    //   { deep: true }
    // );

    return result?.length
      ? res.status(StatusCodes.OK).json(result[0])
      : res.status(StatusCodes.NOT_FOUND).json({
          message: "도서를 찾을 수 없습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
