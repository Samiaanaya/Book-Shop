import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { TButton } from "../../type/button.type";

const ButtonSm = ({ variant = "filled", size = "sm", text }: TButton) => {
  const baseStyles =
    "flex items-center font-title justify-center rounded-md md:font-semibold border border-blue-600";

  const variants = {
    filled:
      "text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600",
    outline:
      "text-blue-600 bg-white hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
  };

  const sizes = {
    sm: "p-[6px] md:px-3 md:py-2",
    md: "p-[6px] md:px-3 md:py-2 w-full",
    lg: "py-2.5 w-full",
  };

  const classes = twMerge(clsx(baseStyles, variants[variant], sizes[size]));

  return <button className={classes}>{text}</button>;
};

export default ButtonSm;
