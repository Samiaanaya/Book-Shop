import SectionTitle from "../common/SectionTitle";
import ChooseCard from "./ChooseCard";
import img1 from "../../assets/book.png";
import img2 from "../../assets/money.png";
import img3 from "../../assets/delivary.png";

const ChooseUs = () => {
  return (
    <div className="py-10">
      <SectionTitle
        subHeading="for their reading needs!"
        heading="Why Choose Us"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <ChooseCard
            title={"Wide Collection of Books"}
            text={
              "Find books from various genres, including fiction, non-fiction, academic, and rare editions. We bring the best titles for every reader."
            }
            img={img1}
            variant={"pink"}
          />
        </div>
        <div>
          <ChooseCard
            title={"Best Price Guarantee"}
            text={
              "Get the best deals on books with our reasonable price match guarantee. We ensure affordable rates without compromising quality."
            }
            variant={"blue"}
            img={img2}
          />
        </div>
        <div className="md:col-span-2">
          <div className="md:w-1/2 m-auto">
            <ChooseCard
              title={"Fast & Reliable Delivery"}
              text={
                "Enjoy quick and hassle-free delivery right to your doorstep. Track your order in real time and get updates instantly and quickly."
              }
              variant={"pink"}
              img={img3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
