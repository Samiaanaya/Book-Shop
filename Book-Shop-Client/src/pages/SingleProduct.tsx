import { Link, useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/product/products.api";
import ButtonSm from "../components/common/ButtonSm";
import Loader from "../components/common/Loader";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/features/product/productSlice";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: singleProduct, isLoading } = useGetSingleProductsQuery(id);

  const handleAddToCard = () => {
    const productData = {
      _id: singleProduct.data._id,
      title: singleProduct.data.title,
      author: singleProduct.data.author,
      price: singleProduct.data.price,
      quantity: 1,
      stock: singleProduct.data.quantity,
      image: singleProduct.data.image as string,
    };

    if (singleProduct.data.quantity > 0) {
      dispatch(addToCart(productData));
      Swal.fire({
        title: "Success!",
        text: "Product added card!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Sorry?",
        text: "Product is out of stock!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="px-2 md:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            className="w-full h-[300px] md:h-[550px] bg-cover rounded-xl"
            src={singleProduct?.data?.image}
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col space-y-2">
          <h2 className="text-2xl md:text-4xl font-title font-bold">
            {singleProduct?.data?.title}
          </h2>
          <p className="text-xl font-title font-semibold">
            By : {singleProduct?.data?.author}
          </p>
          <p className="font-title font-semibold">
            category : {singleProduct?.data?.category}
          </p>
          <p className="border w-full border-gray-200"></p>
          <p className="text-gray-700">
            About : {singleProduct?.data?.description}
          </p>
          <p className="border w-full border-gray-200"></p>
          <p className="font-title font-semibold">
            Publication : {singleProduct?.data?.publication || "Guardian"}
          </p>
          <p className="font-title font-semibold">
            Publish Year : {singleProduct?.data?.publishYear || 2010}
          </p>
          <p className="border w-full border-gray-200"></p>
          <p className="font-title font-semibold">
            Quantity : {singleProduct?.data?.quantity}
          </p>
          <p className="font-title font-semibold">
            Price : {singleProduct?.data?.price}
          </p>
          <div className="font-title">
            {singleProduct?.data?.inStock === true ? (
              <button className="rounded-lg p-2 px-4 bg-blue-100 text-blue-600 ">
                In stock
              </button>
            ) : (
              <button className="rounded-lg p-2 px-4 bg-red-100 text-red-500 ">
                Out of stock
              </button>
            )}
          </div>
          <div className="flex items-center pt-4 gap-4">
            <p onClick={handleAddToCard}>
              <ButtonSm variant="outline" text={"Add to cart"} size="sm" />
            </p>
            <Link onClick={handleAddToCard} to={`/cart`}>
              <ButtonSm text={"Buy Now"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
