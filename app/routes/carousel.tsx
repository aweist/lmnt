import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useLoaderData } from "@remix-run/react";
import EffectCarousel from "../modules/carousel/effect-carousel.esm.js";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { useParallax } from "react-scroll-parallax";

import "../components/swiper.css";
import "../modules/carousel/effect-carousel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";

const client = createStorefrontApiClient({
  storeDomain: "https://aweist.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
});

interface productVariant {
  id: string;
  sku: string;
  title: string;
}
interface productByHandleQueryResponse {
  productByHandle: {
    createdAt: string;
    description: string;
    handle: string;
    id: string;
    variants: {
      nodes: Array<productVariant>;
    };
  };
}

export const loader = async () => {
  const shopQuery = `
    query Product {
      productByHandle(handle: "lmnt-electrolyte-drink") {
          createdAt
          description
          handle
          id
          variants(first: 100) {
              nodes {
                  id
                  sku
                  title
              }
          }
      }
    }
  `;

  const { data, errors, extensions } = await client.request(shopQuery);
  const product: productByHandleQueryResponse =
    data as productByHandleQueryResponse;
  let variants = product.productByHandle.variants.nodes;
  //   remove certain variants for lack of image and multi-variant sets
  variants = variants.filter(
    (variant) =>
      !["chocolate-medley", "mint-chocolate", "lemon-habanero"].includes(
        variant.sku
      )
  );
  return variants;
};

export default function App() {
  const variants = useLoaderData<typeof loader>();

  // hacky way of getting somewhat similar colors to the current website
  const variantColorMap: { [variantSku: string]: string } = {
    citrus: "bg-gradient-to-r from-lime-400",
    watermelon: "bg-gradient-to-r from-red-400",
    orange: "bg-gradient-to-r from-orange-500",
    raspberry: "bg-gradient-to-r from-pink-500",
    raw: "bg-gradient-to-r from-teal-400",
    "mango-chili": "bg-gradient-to-r from-green-400 to-red-500 via-orange-500",
    chocolate: "bg-gradient-to-r from-amber-900",
    grapefruit: "bg-gradient-to-r from-red-300",
  };

  const [isSodiumFactVisible, setSodiumFactVisible] = useState(false);
  const [isPotassiumFactVisible, setPotassiumFactVisible] = useState(false);
  const [isMagnesiumFactVisible, setMagnesiumFactVisible] = useState(false);

  const parallax = useParallax<HTMLDivElement>({
    shouldAlwaysCompleteAnimation: true,
    onProgressChange: (progress) => {
      if (parallax.ref.current) {
        // set progress to CSS variable
        setSodiumFactVisible(0.25 <= progress && progress < 0.5);
        setPotassiumFactVisible(0.5 <= progress && progress < 0.75);
        setMagnesiumFactVisible(0.75 <= progress && progress <= 1);
      }
    },
  });

  return (
    <>
      <div ref={parallax.ref} className="h-[5000px]"></div>
      <div className="fixed w-full top-0 h-screen">
        <div className="flex h-screen justify-center p-20">
          <Swiper
            modules={[Autoplay, Navigation, EffectCarousel]}
            effect="carousel"
            // centeredSlides={true}
            slidesPerView={1}
            navigation={true}
            breakpoints={{
              0: {
                navigation: {
                  enabled: false,
                },
              },
              640: {
                navigation: {
                  enabled: true,
                },
              },
            }}
          >
            {variants.map((variant, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <div className="md:w-[520px] relative">
                    <div
                      className={
                        variantColorMap[variant.sku] +
                        " text-center text-neutral-100 h-auto md:h-0 md:invisible"
                      }
                    >
                      {variant.title}
                    </div>
                    <div className="h-0 md:h-[520px] invisible md:visible">
                      <img
                        id={variant.title}
                        src={"images/packets/" + variant.sku + ".webp"}
                        alt={variant.title + "Salt Packets Image"}
                        className="h-[520px]"
                      />
                    </div>
                    <div className="md:absolute md:top-[6px] md:left-[270px]">
                      <img
                        src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-10.webp"
                        alt={variant.title + "Salt Nutritional Facts"}
                        loading="lazy"
                        className="w-full h-[552px] md:h-[469px]"
                      ></img>
                      <div
                        id="sodium-fact"
                        className={`nutrient-fact ${
                          isSodiumFactVisible ? "nutrient-fact-visible" : ""
                        } opacity-100 absolute top-[60px] left-[150px] w-[400px]`}
                      >
                        <img
                          className="invisible xl:visible animate-pulse absolute xl:w-[280px] xl:top-[60px] xl:left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <img
                          className="animate-pulse absolute xl:invisible top-[228px] left-[-14px] md:top-[162px] md:left-[-50px]"
                          src="images/pointer-sodium-md.svg"
                        ></img>
                        <div className="absolute top-[550px] left-[-150px] md:top-[460px] xl:top-[-20px] w-[250px] xl:w-[200px] md:left-[-240px] xl:left-[140px]">
                          <p className="absolute text-neutral-100 text-xs md:text-base">
                            Research-backed levels of sodium to support brain,
                            heart, bone, hormonal, and immune system health
                          </p>
                        </div>
                      </div>
                      <div
                        id="potassium-fact"
                        className={`nutrient-fact ${
                          isPotassiumFactVisible ? "nutrient-fact-visible" : ""
                        } invisible md:visible absolute top-[225px] left-[150px] w-[400px]`}
                      >
                        <img
                          className="animate-pulse invisible xl:visible absolute w-[280px] top-[60px] left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <img
                          className="animate-pulse absolute xl:invisible top-[258px] left-[-10px] h-[130px] md:top-[162px] md:left-[-50px]"
                          src="images/pointer-potassium-md.svg"
                        ></img>
                        <div className="absolute top-[385px] left-[-150px] md:top-[295px] md:left-[-240px] xl:top-[-20px] w-[250px] xl:w-[200px] xl:left-[175px]">
                          <p className="absolute text-neutral-100 text-xs md:text-base">
                            Potassium works in tandem with sodium to support a
                            myriad of processes in our bodies
                          </p>
                        </div>
                      </div>
                      <div
                        id="magnesium-fact"
                        className={`nutrient-fact ${
                          isMagnesiumFactVisible ? "nutrient-fact-visible" : ""
                        } invisible md:visible absolute top-[243px] left-[150px] w-[400px]`}
                      >
                        <img
                          className="invisible xl:visible animate-pulse absolute w-[280px] top-[60px] left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <img
                          className="animate-pulse absolute xl:invisible top-[261px] left-[-10px] md:top-[162px] md:left-[-50px]"
                          src="images/pointer-magnesium-sm.svg"
                        ></img>
                        <div className="absolute w-[250px] xl:w-[200px] top-[367px] left-[-150px] md:top-[277px] xl:top-[-60px] md:left-[-240px] xl:left-[175px]">
                          <p className="absolute text-neutral-100 text-xs md:text-base">
                            Magnesium supports over 300 enzymatic reactions that
                            drive energy production, bone building, and muscle
                            growth
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed bottom-5 text-white">⌄ Scroll ⌄</div>
        </div>
      </div>
    </>
  );
}
