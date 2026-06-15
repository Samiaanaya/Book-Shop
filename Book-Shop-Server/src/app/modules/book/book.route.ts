import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { bookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(bookValidation.createBookValidationSchema),
  BookController.createBook,
);

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getSingleBook);

router.delete('/:id', BookController.deleteBook);

router.patch(
  '/:id',
  validateRequest(bookValidation.updateBookValidationSchema),
  BookController.updateBook,
);

export const BookRoutes = router;
