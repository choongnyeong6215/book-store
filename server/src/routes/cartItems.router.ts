import express from 'express';
import {
  createCartItem,
  deleteCartItemByItemId,
  getCartItems,
} from '../controller/cartItems.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validationErrorChecker } from '../middleware/validation.middleware';
import { body, param } from 'express-validator';

const router = express.Router();

router
  .post(
    '/',
    [
      body('bookId')
        .exists()
        .withMessage('장바구니에 담을 도서 id는 필수입니다.')
        .isInt()
        .withMessage('도서 id는 정수형입니다..'),
      body('quantity')
        .exists()
        .withMessage('장바구니에 담을 도서 수량은 필수입니다.')
        .isInt()
        .withMessage('도서 수량은 정수형입니다.'),
    ],
    validationErrorChecker,
    verifyToken,
    createCartItem
  )
  .get(
    '/',
    [
      body('selectedCartItems')
        .optional()
        .isArray()
        .withMessage('장바구니 도서 리스트는 배열입니다.'),
      body('selectedCartItems.*')
        .isInt()
        .withMessage('장바구니 도서 id는 정수형입니다.'),
    ],
    validationErrorChecker,
    verifyToken,
    getCartItems
  )
  .delete(
    '/:cartItemId',
    [
      param('cartItemId')
        .isInt()
        .withMessage('삭제할 장바구니 도서 id는 정수형입니다.'),
    ],
    validationErrorChecker,
    verifyToken,
    deleteCartItemByItemId
  );

export default router;
