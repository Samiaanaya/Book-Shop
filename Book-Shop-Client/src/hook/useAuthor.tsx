import { useGetAllProductsQuery } from "../redux/features/product/products.api";
import { TBook } from "../type/product.type";

const useAuthor = () => {
  const { data: products, isFetching } = useGetAllProductsQuery(undefined);

  // const authors = products?.data?.result?.map((product: TBook) => ({
  //   author: product.author,
  //   id: product._id,
  // }));

  const authors = products?.data?.result?.reduce((acc: any, product: TBook) => {
    if (!acc.some((item: any) => item.author === product.author)) {
      acc.push({ author: product.author, id: product._id });
    }
    return acc;
  }, []);

  return [authors, isFetching];
};

export default useAuthor;
