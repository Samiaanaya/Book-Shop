import { TProduct } from "../../type/product.type";
import { FiShoppingCart } from "react-icons/fi";
import "../../App.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/product/productSlice";

const ProductCard = ({ product }: TProduct) => {
  const dispatch = useAppDispatch();
  const { _id, title, author, price, inStock, category, image } = product;

  const handleAddToCard = () => {
    const productData = {
      _id: product._id,
      title: product.title,
      author: product.author,
      price: product.price,
      quantity: 1,
      stock: product.quantity,
      image: product.image as string,
    };

    if (product.quantity > 0) {
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

  return (
    <Link to={`/products/${_id}`}>
      <div className="space-y-4 bg-white rounded-md shadow-sm hover:shadow-lg p-3 md:p-5 h-full">
        <div className="relative">
          <img src={image} className="mx-auto h-[180px] md:h-[230px]" alt="" />
          <div
            onClick={handleAddToCard}
            className="rounded-full p-2 absolute bg-slate-100 top-3 right-2 primary-color flex items-center justify-center"
          >
            <FiShoppingCart className="text-2xl font-semibold text-blue-700" />
          </div>

          <div className="absolute bottom-7 left-0">
            {inStock == true ? (
              <p className="rounded-r-full  p-2 px-4 bg-blue-100 text-blue-500 flex items-center justify-center">
                In Stock
              </p>
            ) : (
              <p className="rounded-r-full p-2 px-4 bg-red-100 text-red-500 flex items-center justify-center">
                Out of Stock
              </p>
            )}
          </div>
        </div>

        <div className="md:px-4 flex flex-col justify-end md:gap-1">
          <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
          <p className="text-gray-800">{author}</p>
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between">
            <p className="md:text-lg font-semibold text-gray-700">
              Price : {price} tk{" "}
            </p>
            <p className="text-sm text-gray-500"> {category} </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
