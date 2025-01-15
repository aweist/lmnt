import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import EffectCarousel from "../modules/carousel/effect-carousel.esm.js";

import "../components/swiper.css";
import "../modules/carousel/effect-carousel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function App() {
  const [isSodiumFactVisible, setIsSodiumFactVisible] = React.useState(false);
  const [isPotassiumFactVisible, setIsPotassiumFactVisible] =
    React.useState(false);
  const [isMagnesiumFactVisible, setIsMagnesiumFactVisible] =
    React.useState(false);

  let factidx = 0;
  function updateFacts() {
    console.log("rotate");
    factidx += 1;
    factidx %= 4;
    setIsSodiumFactVisible(factidx === 1);
    setIsPotassiumFactVisible(factidx === 2);
    setIsMagnesiumFactVisible(factidx === 3);
  }
  React.useEffect(() => {
    console.log(`initializing interval`);
    const interval = setInterval(() => {
      updateFacts();
    }, 4000);

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center bg-neutral-50 p-20">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectCarousel]}
          effect="carousel"
          centeredSlides={true}
          pagination={true}
          slidesPerView={1}
          navigation={true}
        >
          <SwiperSlide>
            <div className="flex justify-center">
              <img
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
                alt="Grapefruit Salt Packets Image"
                className="h-[520px]"
              />
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-10.webp"
                  alt="Grapefruit Salt Nutritional Facts"
                  loading="lazy"
                ></img>
                {isSodiumFactVisible && (
                  <div
                    id="sodium-fact"
                    className="absolute top-[85px] left-[150px] w-[400px]"
                  >
                    <img
                      className="absolute w-[200px] h-[200px]"
                      src="images/pointer.svg"
                    ></img>
                    <div className="absolute w-[200px] left-[175px]">
                      <p className="absolute">
                        Research-backed levels of sodium to support brain,
                        heart, bone, hormonal, and immune system health.
                      </p>
                    </div>
                  </div>
                )}
                {isPotassiumFactVisible && (
                  <div
                    id="potassium-fact"
                    className="absolute top-[268px] left-[150px] w-[400px]"
                  >
                    <img
                      className="absolute w-[200px] h-[200px]"
                      src="images/pointer.svg"
                    ></img>
                    <div className="absolute w-[200px] left-[175px]">
                      <p className="absolute">
                        Potassium works in tandem with sodium to support a
                        myriad of processes in our bodies.
                      </p>
                    </div>
                  </div>
                )}
                {isMagnesiumFactVisible && (
                  <div
                    id="magnesium-fact"
                    className="absolute top-[288px] left-[150px] w-[400px]"
                  >
                    <img
                      className="absolute w-[200px] h-[200px]"
                      src="images/pointer.svg"
                    ></img>
                    <div className="absolute w-[200px] left-[175px]">
                      <p className="absolute">
                        Magnesium supports over 300 enzymatic reactions that
                        drive energy production, bone building, muscle growth,
                        and many other functions
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex justify-center">
              <img
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
                alt="Grapefruit Salt Packets Image"
                className="h-[520px]"
              />
              <img
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
                src="images/packets/lmnt-salt-watermelon-sticks.avif"
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
        </Swiper>
      </div>
    </>
  );
}
