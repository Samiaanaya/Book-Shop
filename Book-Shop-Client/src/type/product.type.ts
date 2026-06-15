export type TBook = {
  _id: string;
  title: string;
  author: string;
  price: number;
  publication?: string;
  category?:
    | "Fiction"
    | "Novel"
    | "Biography"
    | "Mystery"
    | "Thrillers"
    | "History"
    | "Religious"
    | "Poetry"
    | "Science";
  image: string;
  description: string;
  quantity: number;
  inStock: boolean;
  publishYear?: number;
  createdAt: string;
  updatedAt: string;
};

export type TProduct = { key: string; product: TBook };

export type TProductSlice = {
  _id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
};
