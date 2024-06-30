import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  deleteCartItem,
  insertCartItem,
  findCartItems,
  findSelectedCartItems,
} from "../services/cartItems.service";
import {
  ICartItemRequestBody,
  ISelectedCartItem,
} from "../models/cartItems.model";

export const createCartItem = async (
  req: Request<{}, {}, ICartItemRequestBody>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { bookId, quantity } = req.body;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    const result = await insertCartItem(bookId, quantity, userId);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const getCartItems = async (
  req: Request<{}, {}, ISelectedCartItem>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { selectedCartItems } = req.body;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    let result;

    // 장바구니에서 선택한 상품만 조회
    if (selectedCartItems && selectedCartItems.length > 0) {
      result = await findSelectedCartItems(userId, selectedCartItems);
    }

    // 장바구니 전체 상품 조회
    else {
      result = await findCartItems(userId);
    }

    return result.length
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({
          mesasge: "장바구니가 비어있습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const deleteCartItemByItemId = async (
  req: Request<{cartItemId: string}>,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const { cartItemId } = req.params;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    const result = await deleteCartItem(cartItemId, userId);

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};