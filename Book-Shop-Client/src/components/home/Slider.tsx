import { Swiper, SwiperSlide } from "swiper/react";

import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner5.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner6.jpg";

import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
import SliderImg from "./SliderImg";

const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-[40vh] md:h-[70vh] w-full"
      >
        <SwiperSlide>
          <SliderImg
            image={banner1}
            text={"Discover Your Next Favorite Book. Explore Our Collections!"}
          ></SliderImg>
        </SwiperSlide>
        <SwiperSlide>
          <SliderImg
            image={banner2}
            text={"Discover Your Next Favorite Book. Explore Our Collections!"}
          ></SliderImg>
        </SwiperSlide>
        <SwiperSlide>
          <SliderImg
            image={banner3}
            text={"Discover Your Next Favorite Book. Explore Our Collections!"}
          ></SliderImg>
        </SwiperSlide>
        <SwiperSlide>
          <SliderImg
            image={banner4}
            text={"Discover Your Next Favorite Book. Explore Our Collections!"}
          ></SliderImg>
        </SwiperSlide>
        <SwiperSlide>
          <SliderImg
            image={banner5}
            text={"Discover Your Next Favorite Book. Explore Our Collections!"}
          ></SliderImg>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
