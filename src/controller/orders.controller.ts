import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  insertOrder,
  findOrders,
  findOrderDetail,
} from "../services/orders.service";
import { IOrderRequestBody } from "../models/orders.model";

export const createOrder = async (
  req: Request<{}, {}, IOrderRequestBody>,
  res: Response
): Promise<Response> => {
  const {
    cartItemIds,
    delivery,
    representativeBookTitle,
    totalQuantity,
    totalPrice,
  } = req.body;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    const result = await insertOrder(
      userId,
      cartItemIds,
      delivery,
      representativeBookTitle,
      totalQuantity,
      totalPrice
    );

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const getOrderDetail = async (req: Request, res: Response) => {
  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    const result = await findOrders(userId);

    return result.length
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({
          message: "주문 내역이 없습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export const getOrderDetailByOrderId = async (
  req: Request<{ orderId: string }>,
  res: Response
) => {
  const { orderId } = req.params;

  try {
    const userId = req.payload?.id;

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "로그인이 필요합니다.",
      });
    }

    const result = await findOrderDetail(userId, orderId);

    return result.length
      ? res.status(StatusCodes.OK).json(result)
      : res.status(StatusCodes.NOT_FOUND).json({
          message: "주문 내역이 없습니다.",
        });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
