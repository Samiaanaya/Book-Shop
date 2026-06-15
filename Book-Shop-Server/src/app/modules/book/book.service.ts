import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BookSearchableFields } from './book.constant';
import { IBook } from './book.interface';
import { Book } from './book.model';

const createBookIntoDB = async (payload: IBook) => {
  const bookData = payload;

  const result = await Book.create(bookData);
  return result;
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(Book.find(), query)
    .search(BookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookQuery.modelQuery;
  const meta = await bookQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book is not found');
  }
  return result;
};

const updateBookFromDB = async (id: string, payload: Partial<IBook>) => {
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book is not found');
  }

  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBookIntoDB = async (id: string) => {
  const isBookExist = await Book.findById(id);
  if (!isBookExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Book is not found');
  }

  const result = await Book.findByIdAndDelete(id, { new: true });
  return result;
};

export const BookService = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookFromDB,
  deleteBookIntoDB,
};
