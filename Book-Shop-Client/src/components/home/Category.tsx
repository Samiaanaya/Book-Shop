import SectionTitle from "../common/SectionTitle";
import img1 from "../../assets/banner6.jpg";
import img2 from "../../assets/banner4.jpg";
import img3 from "../../assets/pexels-pixabay-207636.jpg";

const Category = () => {
  return (
    <div>
      <SectionTitle
        subHeading="Explore our top categories"
        heading="CATEGORIES"
      />
      <div className="flex flex-col md:flex-row gap-5">
        <div className="space-y-2 md:w-1/3 font-title shadow-sm p-4 rounded-lg bg-white">
          <img src={img3} className="rounded-lg w-full h-[250px]" alt="" />
          <h2 className="text-2xl font-title">Religious Book</h2>
          <p className="text-gray-500  font-title pb-5">
            Explore a vast collection of religious books that inspire and
            enlighten. Whether you're looking for sacred texts, spiritual
            guides, or books on faith and philosophy, we have carefully selected
            works from different traditions.
          </p>
        </div>

        <div className="space-y-1 md:w-1/3 font-title shadow-sm p-4 rounded-lg bg-white">
          <img src={img2} className="rounded-lg w-full h-[250px]" alt="" />
          <h2 className="text-2xl font-title">Fiction Book</h2>
          <p className="text-gray-500  font-title pb-5">
            Explore a vast collection of Fiction books that inspire and
            enlighten. Whether you're looking for sacred texts, spiritual
            guides, or books on faith and philosophy, we have carefully selected
            works from different traditions.
          </p>
        </div>

        <div className="space-y-1 md:w-1/3 font-title shadow-sm p-4 rounded-lg bg-white">
          <img src={img1} className="rounded-lg w-full h-[250px]" alt="" />
          <h2 className="text-2xl font-title">Novel Book</h2>
          <p className="text-gray-500  font-title pb-5">
            Explore a vast collection of Novel books that inspire and enlighten.
            Whether you're looking for sacred texts, spiritual guides, or books
            on faith and philosophy, we have carefully selected works from
            different traditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Category;
