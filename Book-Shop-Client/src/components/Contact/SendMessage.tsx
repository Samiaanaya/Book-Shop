import { useForm } from "react-hook-form";
import ButtonSm from "../common/ButtonSm";
import Swal from "sweetalert2";
import imgBg from "../../assets/cart2.jpg";
import logo from "../../assets/logo.png";
import SectionTitle from "../common/SectionTitle";

const SendMessage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    Swal.fire({
      title: "Success!",
      text: "Successfully send your message. We will contact you soon!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="py-12">
      <SectionTitle subHeading="how we can help!" heading="Message Us" />
      <div className="flex flex-col md:flex-row items-center justify-center bg-white md:rounded-xl">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img className="w-full h-[280px] md:h-[500px]" src={imgBg} alt="" />
        </div>

        <div className="w-full md:w-1/2 p-5  md:h-[500px] md:p-8 lg:px-10 lg:py-10  space-y-3">
          <div className="flex items-center justify-center">
            <img className="w-[50px]" src={logo} alt="" />
            <h2 className="font-semibold md:text-3xl">
              Ink<span className="primary-color">Spire</span>
            </h2>
          </div>
          <h2 className="text-base text-center">
            Welcome to InkSpire. Send your message!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div>
                <label className="block mb text-sm">Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Message</label>
                <div className="mt-2">
                  <textarea
                    placeholder="Type your message"
                    {...register("message", { required: true })}
                    className="w-full p-2 border rounded-md border-gray-400 text-gray-900"
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <ButtonSm size="md" text={"Send Message"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
