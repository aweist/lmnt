import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import EffectCarousel from "../modules/carousel/effect-carousel.esm.js";
import "../modules/carousel/effect-carousel.css";

import "swiper/css";
import "swiper/css/pagination";
import "../components/swiper.css";
import packetimg from "../images/packets/lmnt-salt-watermelon-sticks.avif";

export default function App() {
  return (
    <>
      <div className="flex justify-center bg-neutral-50 p-20">
        <div className="w-[700px] h-[600px]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCarousel]}
            effect="carousel"
            centeredSlides={true}
            pagination={true}
          >
            <SwiperSlide>
              <div className="flex justify-center">
                <img
                  src={packetimg}
                  alt="Grapefruit Salt Packets Image"
                  className="h-[520px]"
                />
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
          </Swiper>
        </div>
      </div>
    </>
  );
}
