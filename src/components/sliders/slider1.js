import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";

import arrow from "../../images/Icon Right.png";
import PropertyCard from "../cards/PropertyCard";

export default function Slider1({ title }) {
  let swiperRef = useRef();
  // const [loader, setLoader] = useState(false);
   
  return (
    <div className="flex flex-col gap-y-[20px]">
      <h1 className="text-[32px] text-defblack">{title}</h1>

      <div className="flex w-full gap-8">
        {false ? (
          <p>loader</p>
        ) : (
          <div className="w-full relative">
            <button
              className={`absolute top-[50%] left-[-60px] w-[30px] h-[30px] flex items-center justify-center cursor-pointer`}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <img
                className="w-[90%] h-[90%] object-contain"
                src={arrow}
                alt="img"
              />
            </button>
            <button
              className={`absolute top-[50%] right-[-60px] w-[30px] h-[30px] flex items-center justify-center rotate-[180deg] cursor-pointer`}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img
                className="w-[90%] h-[90%] object-contain"
                src={arrow}
                alt="img"
              />
            </button>
            <Swiper
              modules={[Autoplay, EffectFade]}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              className="w-[100%]"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              speed={1200}
            >
              {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, ].map((item) => (
                <SwiperSlide key={item}>
                  <PropertyCard />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
