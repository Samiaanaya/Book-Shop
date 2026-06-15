import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookService } from './book.service';

const createBook = catchAsync(async (req, res) => {
  const result = await BookService.createBookIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookService.getAllBooksFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.getSingleBookFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieve successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookService.updateBookFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BookService.deleteBookIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: [],
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
