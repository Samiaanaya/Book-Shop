import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type TVariant = {
  pink: string;
  blue: string;
};

type TCard = {
  title: string;
  text: string;
  img: string;
  variant: keyof TVariant;
};

const ChooseCard = ({ title, text, img, variant }: TCard) => {
  const baseStyles = "p-8 w-full rounded-lg space-y-1";

  const variants = {
    pink: "bg-pink-100",
    blue: "bg-blue-100",
  };

  const classes = twMerge(clsx(baseStyles, variants[variant]));

  return (
    <div className={classes}>
      <div>
        <img src={img} className="h-[100px]" alt="" />
      </div>
      <p className="font-title text-lg font-semibold">{title}</p>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export default ChooseCard;
