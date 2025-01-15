import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export default () => {
  return (
    <Swiper pagination={true} modules={[EffectFade, Pagination]} effect="fade">
      <SwiperSlide>
        <img
          className="w-full object-contain md:max-w-[50%] lg:w-auto"
          src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-10.webp"
          alt="Grapefruit Salt Nutritional Facts"
          loading="lazy"
          width="240"
          height="520"
        ></img>
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
  );
};
