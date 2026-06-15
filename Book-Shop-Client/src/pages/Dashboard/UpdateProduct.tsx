import { FieldValues, useForm } from "react-hook-form";
import SectionTitle from "../../components/common/SectionTitle";
import ButtonSm from "../../components/common/ButtonSm";
import { bookCategory } from "../../utils/productCategory";
import axios from "axios";
import {
  useGetSingleProductsQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/products.api";
import Loader from "../../components/common/Loader";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const [UpdateProduct] = useUpdateProductMutation();
  const { id } = useParams();
  const { data: singleProduct, isLoading } = useGetSingleProductsQuery(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    let inStock = true;
    if (data.inStock == "false") {
      inStock = false;
    }

    try {
      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", "book_shop");
      formData.append("cloud_name", "dge3fjctm");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dge3fjctm/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;

      const bookData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        publishYear: Number(data.publishYear),
        inStock: inStock,
        image: imageUrl,
      };

      const result = await UpdateProduct({ id, bookData });

      if (result?.error) {
        Swal.fire({
          title: "Sorry!",
          text: "Something went wrong!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Book updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white min-h-screen rounded-lg shadow-md px-5 py-3">
      <SectionTitle heading="Update Books" subHeading="What you updates" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <label className="block mb text-sm">Book Name</label>
              <div className="mt-2">
                <input
                  type="title"
                  defaultValue={singleProduct.data.title}
                  {...register("title", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Author Name</label>
              <div className="mt-2">
                <input
                  type="author"
                  defaultValue={singleProduct.data.author}
                  {...register("author", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.author && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <label className="block mb text-sm">Publication Name</label>
              <div className="mt-2">
                <input
                  type="publication"
                  defaultValue={singleProduct.data.publication}
                  {...register("publication", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.publication && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Price</label>
              <div className="mt-2">
                <input
                  type="price"
                  defaultValue={singleProduct.data.price}
                  {...register("price", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.price && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Publish Year</label>
              <div className="mt-2">
                <input
                  type="publishYear"
                  defaultValue={singleProduct.data.publishYear}
                  {...register("publishYear", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.publishYear && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <label className="block mb text-sm">Description</label>
              <div className="mt-2">
                <input
                  type="description"
                  defaultValue={singleProduct.data.description}
                  {...register("description", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Image</label>
              <div className="mt-2">
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.image && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row  gap-3">
            <div className="w-full">
              <label className="block mb text-sm">Available</label>
              <div className="mt-2">
                <select
                  {...register("inStock")}
                  value={singleProduct.data.inStock}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of stock</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Category</label>
              <div className="mt-2">
                <select
                  defaultValue={singleProduct.data.category}
                  {...register("category")}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                >
                  {bookCategory.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block mb text-sm">Quantity</label>
              <div className="mt-2">
                <input
                  type="quantity"
                  defaultValue={singleProduct.data.quantity}
                  {...register("quantity", { required: true })}
                  className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                />
                {errors.quantity && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>

          <ButtonSm variant="filled" text="Update Product"></ButtonSm>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
