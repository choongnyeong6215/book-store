import express from 'express';
import { getAllBooks, getBook } from '../controller/books.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { query, param } from 'express-validator';
import { validationErrorChecker } from '../middleware/validation.middleware';

const router = express.Router();

router.get(
  '/',
  [
    query('listNum')
      .optional()
      .isInt()
      .withMessage('한 페이지당 도서 수는 정수형입니다.'),
    query('currentPage')
      .optional()
      .isInt()
      .withMessage('현재 페이지는 정수형입니다.'),
    query('categoryId')
      .optional()
      .isInt()
      .withMessage('카테고리 id는 정수형입니다.'),
    query('isNewRelease').optional(),
  ],
  validationErrorChecker,
  getAllBooks
);
router.get(
  '/:bookId',
  [param('bookId').isInt().withMessage('도서 id는 정수형입니다.')],
  validationErrorChecker,
  verifyToken,
  getBook
);

export default router;
