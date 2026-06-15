import AccordionComp from "../components/home/Accordion";
import Category from "../components/home/Category";
import ContactUs from "../components/home/ContactUs";
import FeaturesProducts from "../components/home/FeaturesProducts";
import Slider from "../components/home/Slider";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <Slider />

      <div className="px-2 md:max-w-7xl mx-auto">
        <FeaturesProducts />
        <Category />
        <AccordionComp />
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;
