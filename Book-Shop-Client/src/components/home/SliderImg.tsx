import { Link } from "react-router-dom";

const SliderImg = ({ image, text }: any) => {
  return (
    <div
      className="w-full h-[40vh] md:h-[70vh] bg-center bg-cover rounded-lg"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center text-white w-full h-full bg-gray-900/70">
        <div className="text-center text-white font-semibold w-[80%] md:w-[70%] mx-auto">
          <h1 className="text-xl md:text-3xl lg:text-5xl">{text}</h1>
          <br />
          <Link
            to={"/products"}
            className="text-center border border-blue-600 px-5 py-3 mt-4 rounded-md"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SliderImg;
