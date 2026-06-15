import Swal from "sweetalert2";
import ButtonSm from "../../components/common/ButtonSm";
import Loader from "../../components/common/Loader";
import TableData from "../../components/Table/TableData";
import TableHead from "../../components/Table/TableHead";
import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "../../redux/features/user/user.api";
import { toast } from "sonner";

const AllUser = () => {
  const { data: allUsers, isLoading } = useGetAllUsersQuery(undefined);
  const [BlockUser] = useBlockUserMutation();

  const handleBlock = async (id: string) => {
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
          const res = await BlockUser(id);
          if (res?.error) {
            toast.error("Something Went Wrong");
          } else {
            Swal.fire({
              title: "Blocked!",
              text: "User has been blocked.",
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
                <TableHead text={"name"} />
                <TableHead text={"email"} />
                <TableHead text={"mobile"} />
                <TableHead text={"role"} />
                <TableHead text={"block"} />
              </tr>
            </thead>
            <tbody>
              {allUsers?.data?.map((user: any, index: any) => (
                <tr key={index}>
                  <TableData text={index} />
                  <TableData text={user.name} />
                  <TableData text={user.email} />
                  <TableData text={user.phone} />
                  <TableData text={user.role} />
                  {user.isBlocked === true ? (
                    <TableData text={"Blocked"} />
                  ) : (
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      <p onClick={() => handleBlock(user._id)}>
                        <ButtonSm variant="outline" text="Block" />
                      </p>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
