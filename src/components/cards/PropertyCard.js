import React from "react";
import location from "../../images/Icon.png";
import bed from "../../images/bed.png";
import square from "../../images/Vector (1).png";
import direction from "../../images/Vector (2).png";
import { Link } from "react-router-dom";

export default function PropertyCard({ item }) {
  return (
    <div className="relative w-full rounded-[14px] overflow-hidden border-[1px] border-defaultBg ">
      <div className="absolute top-[20px] left-[20px] rounded-[15px] text-[12px] text-white bg-defTranspblack w-[90px] h-[26px] flex items-center justify-center">
        <h1>{item?.is_rental === 1 ? "იყიდება" : "ქირავდება"}</h1>
      </div>
      <Link
        to={`/real-estate/${item?.id}`}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <img
          className="w-full h-[307px] object-cover"
          src={item?.image}
          alt="property img"
        />
      </Link>
      <div className="flex flex-col gap-y-[20px] py-[22px] px-[25px]">
        <div className="flex flex-col gap-y-[6px]">
          <h1 className="text-[28px]">{item?.price} ₾</h1>
          <div className="flex items-center gap-[4px]">
            <img className="" src={location} alt="img" />
            <p className="text-defTranspblackText">
              {item?.city?.name}, {item?.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[32px] text-defTranspblackText">
          <div className="flex items-center gap-[5px]">
            <img className="" src={bed} alt="img" />
            <p>{item?.bedrooms}</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img className="" src={square} alt="img" />
            <p>{item?.area} მ²</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img className="" src={direction} alt="img" />
            <p>{item?.zip_code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
