import TableData from "../../components/Table/TableData";
import TableHead from "../../components/Table/TableHead";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/features/product/products.api";
import { Link } from "react-router-dom";
import ButtonSm from "../../components/common/ButtonSm";
import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";
import { toast } from "sonner";

const ManageProduct = () => {
  const { data: allProducts, isLoading } = useGetAllProductsQuery(undefined);
  const [DeleteProducts] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await DeleteProducts(id);
          if (res?.error) {
            toast.error("Something Went Wrong!");
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Book has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 mt-2 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-blue-900">
                <TableHead text={"#"} />
                <TableHead text={"Title"} />
                <TableHead text={"Author"} />
                <TableHead text={"Price"} />
                <TableHead text={"Publication"} />
                <TableHead text={"Delete"} />
                <TableHead text={"Update"} />
              </tr>
            </thead>
            <tbody>
              {allProducts?.data?.result?.map((product: any, index: any) => (
                <tr key={index} className="bg-[#003060cb]">
                  <TableData text={index + 1} />
                  <TableData text={product.title} />
                  <TableData text={product.author} />
                  <TableData text={product.price} />
                  <TableData text={product?.publication || ".."} />
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <p onClick={() => handleDelete(product._id)}>
                      <ButtonSm variant="outline" text="Delete" />
                    </p>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <Link to={`/dashboard/update-product/${product._id}`}>
                      <ButtonSm variant="outline" text="Update" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
