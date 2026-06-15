// import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-700"></div>
      </div>
    </div>
  );
};

export default Loader;
