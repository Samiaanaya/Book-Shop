import Loader from "../../components/common/Loader";
import TableData from "../../components/Table/TableData";
import TableHead from "../../components/Table/TableHead";
import { useMyOrdersQuery } from "../../redux/features/order/order.api";

const MyOrder = () => {
  const { data: myOrders, isLoading } = useMyOrdersQuery(undefined);

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
                <TableHead text={"Payment"} />
                <TableHead text={"Price"} />
                <TableHead text={"Method"} />
                <TableHead text={"Status"} />
              </tr>
            </thead>
            <tbody>
              {myOrders?.data?.map((item: any, index: number) => (
                <tr key={index}>
                  <TableData text={index + 1} />
                  <TableData text={item?.transaction?.date_time} />
                  <TableData text={item?.transaction?.id} />
                  <TableData text={item?.status} />
                  <TableData text={item?.totalPrice} />
                  <TableData text={item?.transaction?.method} />
                  <TableData text={item?.transaction?.bank_status} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {myOrders?.data?.length == 0 && (
        <p className="text-center font-title">You are not ordered yet!</p>
      )}
    </div>
  );
};

export default MyOrder;
