import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/products.api";
import { TBook } from "../../type/product.type";
import SectionTitle from "../common/SectionTitle";
import ProductCard from "../Product/ProductCard";
import ButtonSm from "../common/ButtonSm";
import Loader from "../common/Loader";

const FeaturesProducts = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <div>
      <SectionTitle heading="Features Books" subHeading="What we provides!" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
        {products?.data?.result?.slice(0, 8).map((product: TBook) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Link to={"/products"} className="flex items-center justify-center mt-5">
        <ButtonSm text="Explore More" />
      </Link>
    </div>
  );
};

export default FeaturesProducts;
