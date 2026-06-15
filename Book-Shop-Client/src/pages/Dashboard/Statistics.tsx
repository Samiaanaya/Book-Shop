import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import { useGetAllProductsQuery } from "../../redux/features/product/products.api";
import Loader from "../../components/common/Loader";
import {
  useAllOrdersQuery,
  useCalculateRevenueQuery,
} from "../../redux/features/order/order.api";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "purple"];

const getPath = (x: any, y: any, width: any, height: any) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Statistics = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
  const { data: revenue } = useCalculateRevenueQuery(undefined);
  const { data: allOrders } = useAllOrdersQuery(undefined);

  let categoryData;
  if (products?.data?.result) {
    const categoryCounts = products.data.result.reduce(
      (acc: any, product: any) => {
        const category = product?.category;
        if (!acc[category]) {
          acc[category] = 1;
        } else {
          acc[category]++;
        }
        return acc;
      },
      {}
    );

    categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  if (isLoading) return <Loader />;

  return (
    <div className="py-10 space-y-6">
      <div className="shadow-md text-center font-semibold rounded-lg flex flex-col md:flex-row w-full">
        <div className="space-y-3 p-5 w-full md:w-1/3 border">
          <div className="text-3xl">Total Book</div>
          <div> Number of books{products?.data?.result?.length}</div>
        </div>

        <div className="space-y-3 text-blue-700 p-5 w-full md:w-1/3 border">
          <div className="text-3xl text-center font-semibold">Total Order</div>
          <div>Number of orders {allOrders?.data?.length}</div>
        </div>

        <div className="space-y-3 p-5 w-full md:w-1/3 border">
          <div className=" text-3xl text-center font-semibold">
            Total Revenue
          </div>
          <div>{revenue?.data[0]?.totalRevenue} taka</div>
        </div>
      </div>

      <div className="md:space-y-2">
        <div className="flex justify-center">
          <BarChart
            width={600}
            height={300}
            data={categoryData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="value"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {categoryData?.map((entry, index) => (
                <Cell key={`cell-${entry?.name}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <h1 className="text-gray-600 text-center">
          The total books in each category
        </h1>
      </div>
    </div>
  );
};

export default Statistics;
