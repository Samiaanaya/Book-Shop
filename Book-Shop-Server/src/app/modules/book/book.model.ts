import { model, Schema } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publication: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Novel',
          'Biography',
          'Mystery',
          'Thrillers',
          'History',
          'Religious',
          'Science',
          'Poetry',
        ],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Type field is required'],
    },
    image: { type: String, required: true },
    publishYear: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBook>('Book', bookSchema);
