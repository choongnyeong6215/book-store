import express from 'express';
import { getAllCategories } from '../controller/categories.controller';

const router = express.Router();

router.get('/', getAllCategories);

export default router;
