import Cover from "../components/common/Cover";
import img1 from "../assets/cart1.jpg";
import ChooseUs from "../components/About/ChooseUs";
import Mission from "../components/About/Mission";

const About = () => {
  return (
    <div className="px-2 md:max-w-7xl mx-auto">
      <Cover title={"About us"} subTitle={"Explore you about us!"} img={img1} />
      <ChooseUs />
      <Mission />
    </div>
  );
};

export default About;
