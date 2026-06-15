import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#00306019] py-12">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div>
          <img className="h-14 w-14 " src={logo} alt="" />
        </div>
        <h2 className="text-3xl font-bold">
          Ink<span className="text-blue-800">Spire</span>
        </h2>
        <p className="text-sm text-center wd-[70%] md:w-[50%]">
          Thank you for choosing InkSpire, where every page turns into a new
          adventure! Whether you're looking for timeless classics, the latest
          bestsellers, or hidden literary gems, we are here to inspire your
          reading journey.
        </p>
        <p className="font-semibold mb-1">
          Providing reliable products since 1992
        </p>
        <p className="text-sm">Copyright © 2024 - All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
