import express from 'express';
import {
  createUserLikedBook,
  deleteUserLikedBook,
} from '../controller/likes.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { validationErrorChecker } from '../middleware/validation.middleware';
import { param } from 'express-validator';

const router = express.Router();

router
  .post(
    '/:bookId',
    [param('bookId').isInt().withMessage('도서 id는 정수형입니다.')],
    validationErrorChecker,
    verifyToken,
    createUserLikedBook
  )
  .delete(
    '/:bookId',
    [param('bookId').isInt().withMessage('도서 id는 정수형입니다.')],
    validationErrorChecker,
    verifyToken,
    deleteUserLikedBook
  );

export default router;
