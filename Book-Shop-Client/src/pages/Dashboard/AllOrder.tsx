import Swal from "sweetalert2";
import Loader from "../../components/common/Loader";
import TableData from "../../components/Table/TableData";
import TableHead from "../../components/Table/TableHead";
import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../redux/features/order/order.api";
import { toast } from "sonner";
import ButtonSm from "../../components/common/ButtonSm";

const AllOrder = () => {
  const { data: allOrders, isLoading } = useAllOrdersQuery(undefined);
  const [DeleteOrder] = useDeleteOrderMutation();

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
          const res = await DeleteOrder(id);
          if (res?.error) {
            toast.error("Something Went Wrong!");
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Order has been deleted.",
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
                <TableHead text={"Date"} />
                <TableHead text={"Transaction Id"} />
                <TableHead text={"Customer Name"} />
                <TableHead text={"Price"} />
                <TableHead text={"Email"} />
                <TableHead text={"Method"} />
                <TableHead text={"Status"} />
                <TableHead text={"Delete"} />
              </tr>
            </thead>
            <tbody>
              {allOrders?.data?.map((item: any, index: number) => (
                <tr key={index}>
                  <TableData text={index + 1} />
                  <TableData
                    text={new Date(
                      item?.transaction?.date_time
                    ).toLocaleDateString()}
                  />
                  <TableData text={item?.transaction?.id} />
                  <TableData text={item?.user?.name} />
                  <TableData text={item?.totalPrice} />
                  <TableData text={item?.user?.email} />
                  <TableData text={item?.transaction?.method} />
                  <TableData text={item?.transaction?.bank_status} />
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                    <p onClick={() => handleDelete(item._id)}>
                      <ButtonSm variant="outline" text="Delete" />
                    </p>
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

export default AllOrder;
