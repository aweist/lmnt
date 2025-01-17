import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useLoaderData } from "@remix-run/react";
import EffectCarousel from "../modules/carousel/effect-carousel.esm.js";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

import "../components/swiper.css";
import "../modules/carousel/effect-carousel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

const client = createStorefrontApiClient({
  storeDomain: "https://aweist.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: "f76d5c9e4d1dd07c3390b6f7c415faa4",
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
  console.log(variants);

  const [isSodiumFactVisible, setIsSodiumFactVisible] = useState(false);
  const [isPotassiumFactVisible, setIsPotassiumFactVisible] = useState(false);
  const [isMagnesiumFactVisible, setIsMagnesiumFactVisible] = useState(false);

  let factidx = 0;
  function updateFacts() {
    factidx += 1;
    factidx %= 4;
    setIsSodiumFactVisible(factidx === 1);
    setIsPotassiumFactVisible(factidx === 2);
    setIsMagnesiumFactVisible(factidx === 3);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      updateFacts();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center p-20">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectCarousel]}
          effect="carousel"
          centeredSlides={true}
          slidesPerView={1}
          navigation={true}
        >
          {variants.map((variant, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <div className="w-[520px] relative">
                  <div>
                    <img
                      id={variant.title}
                      src={"images/packets/" + variant.sku + ".webp"}
                      alt={variant.title + "Salt Packets Image"}
                      className="h-[520px]"
                    />
                  </div>
                  <div className="absolute top-[6px] left-[270px]">
                    <img
                      src="https://res.cloudinary.com/dg0m1wsvu/image/upload/f_auto,q_auto/v1690825963/components/nutrition-facts/nfp-stick-pack-10.webp"
                      alt={variant.title + "Salt Nutritional Facts"}
                      loading="lazy"
                      className="h-[469px]"
                    ></img>
                    {isSodiumFactVisible && (
                      <div
                        id="sodium-fact"
                        className="nutrient-fact invisible md:visible absolute top-[60px] left-[150px] w-[400px]"
                      >
                        <img
                          className="absolute w-[280px] top-[60px] left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <div className="absolute w-[200px] left-[140px]">
                          <p className="absolute text-neutral-100	">
                            Research-backed levels of sodium to support brain,
                            heart, bone, hormonal, and immune system health.
                          </p>
                        </div>
                      </div>
                    )}
                    {isPotassiumFactVisible && (
                      <div
                        id="potassium-fact"
                        className="nutrient-fact invisible md:visible absolute top-[225px] left-[150px] w-[400px]"
                      >
                        <img
                          className="absolute w-[280px] top-[60px] left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <div className="absolute w-[200px] left-[175px]">
                          <p className="absolute text-neutral-100">
                            Potassium works in tandem with sodium to support a
                            myriad of processes in our bodies.
                          </p>
                        </div>
                      </div>
                    )}
                    {isMagnesiumFactVisible && (
                      <div
                        id="magnesium-fact"
                        className="nutrient-fact invisible md:visible absolute top-[243px] left-[150px] w-[400px]"
                      >
                        <img
                          className="absolute w-[280px] top-[60px] left-[-30px]"
                          src="images/pointer.svg"
                        ></img>
                        <div className="absolute w-[200px] top-[-40px] left-[175px]">
                          <p className="absolute text-neutral-100">
                            Magnesium supports over 300 enzymatic reactions that
                            drive energy production, bone building, muscle
                            growth, and many other functions
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
