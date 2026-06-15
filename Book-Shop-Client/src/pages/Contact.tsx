import Cover from "../components/common/Cover";
import img1 from "../assets/cart1.jpg";
import SendMessage from "../components/Contact/SendMessage";
import ContactUs from "../components/home/ContactUs";

const Contact = () => {
  return (
    <div className="px-2 md:max-w-7xl mx-auto">
      <Cover
        title={"Contact us"}
        subTitle={"If you want to know. Contact us!"}
        img={img1}
      />
      <SendMessage />
      <ContactUs />
    </div>
  );
};

export default Contact;
