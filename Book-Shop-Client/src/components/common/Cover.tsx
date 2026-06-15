import { Parallax } from "react-parallax";

const Cover = ({ title, subTitle, img }: any) => {
  return (
    <Parallax
      blur={{ min: -100, max: 100 }}
      bgImage={img}
      bgImageAlt="the menu"
      strength={-200}
      className="rounded-lg"
    >
      <div className="h-[30vh] md:h-[50vh] bg-gray-900/70 text-white text-center flex flex-col items-center justify-center space-y-3">
        <h1 className="text-center text-3xl md:text-4xl uppercase font-bold">
          {title}
        </h1>
        <p className="text-center">{subTitle}</p>
      </div>
    </Parallax>
  );
};

export default Cover;
