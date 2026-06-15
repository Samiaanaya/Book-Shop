export interface IBook {
  title: string;
  author: string;
  price: number;
  publication: string;
  category:
    | 'Fiction'
    | 'Novel'
    | 'Biography'
    | 'Mystery'
    | 'Thrillers'
    | 'History'
    | 'Religious'
    | 'Poetry'
    | 'Science';
  image: string;
  description: string;
  quantity: number;
  inStock: boolean;
  publishYear: number;
  createdAt: Date;
  updatedAt: Date;
}
