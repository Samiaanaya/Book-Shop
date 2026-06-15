import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import img from "../../assets/banner1.jpg";
import SectionTitle from "../common/SectionTitle";

const AccordionComp = () => {
  return (
    <div className="my-10">
      <SectionTitle
        heading="FAQ Questions"
        subHeading="what you want to know!"
      />
      <div className="flex bg-white flex-col shadow-sm rounded-xl p-5 md:flex-row gap-5 items-center justify-between">
        <div className="w-full md:w-1/2">
          <img className="rounded-xl w-full md:h-[420px]" src={img} alt="" />
        </div>
        <div className="w-full md:w-1/2">
          <Accordion type="single" collapsible className="w-full text-xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                Delivery times vary depending on your location. Typically,
                domestic orders take 3-5 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept credit/debit cards, mobile banking, and digital
                wallets such as Bikash.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is your return and refund policy?
              </AccordionTrigger>
              <AccordionContent>
                We accept returns within 7 days of delivery if the book is
                unused and in its original condition. Refunds are processed once
                we receive the returned item.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you have a physical store?</AccordionTrigger>
              <AccordionContent>
                No, we are an online-only bookstore. However, we ensure a
                seamless shopping experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Can I pre-order upcoming books?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we allow pre-orders for selected books. Check the product
                page for availability and estimated release dates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we provide international shipping. Shipping charges and
                delivery time may vary based on your location.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                You can reach our customer support team via email at
                support@yourbookshop.com or through the contact form on our
                website.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordionComp;
