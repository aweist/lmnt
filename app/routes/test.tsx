import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../components/swiper.css";

export default function App() {
  const pagination = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[700px] h-[600px]">
          <Swiper
            centeredSlides={true}
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="flex justify-center">
                <img
                  className="w-full object-contain md:max-w-[50%] lg:w-auto"
                  src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-10.webp"
                  alt="Grapefruit Salt Nutritional Facts"
                  loading="lazy"
                  width="240"
                  height="520"
                ></img>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full object-contain md:max-w-[50%] lg:w-auto"
                src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-5.webp"
                alt="Grapefruit Salt Nutritional Facts"
                loading="lazy"
                width="240"
                height="520"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
