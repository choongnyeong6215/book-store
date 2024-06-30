import express from 'express';
import {
  createOrder,
  getOrderDetail,
  getOrderDetailByOrderId,
} from '../controller/orders.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validationErrorChecker } from '../middleware/validation.middleware';
import { body, param } from 'express-validator';

const router = express.Router();

router
  .post(
    '/',
    [
      body('cartItemIds')
        .exists()
        .withMessage('주문할 장바구니 id는 필수입니다.')
        .isArray()
        .withMessage('장바구니 도서 리스트는 배열입니다.'),
      body('cartItemIds.*').isInt().withMessage('주문 도서는 정수형입니다.'),
      body('delivery').exists().withMessage('배송지 정보는 필수입니다.'),
      body('representativeBookTitle')
        .exists()
        .withMessage('대표 도서 제목은 필수입니다.')
        .isString()
        .withMessage('대표 도서 제목은 문자형입니다.'),
      body('totalQuantity')
        .exists()
        .withMessage('총 수량은 필수입니다.')
        .isInt()
        .withMessage('총 수량은 정수형입니다.'),
      body('totalPrice')
        .exists()
        .withMessage('총 금액은 필수입니다.')
        .isInt()
        .withMessage('총 금액은 정수형입니다.'),
    ],
    validationErrorChecker,
    verifyToken,
    createOrder
  )
  .get('/', verifyToken, getOrderDetail)
  .get(
    '/:orderId',
    [param('orderId').isInt().withMessage('주문 id는 정수형입니다.')],
    validationErrorChecker,
    verifyToken,
    getOrderDetailByOrderId
  );

export default router;
