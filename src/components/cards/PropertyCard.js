import React from "react";
import img from "../../images/Rectangle 37.png";
import location from "../../images/Icon.png";
import bed from "../../images/bed.png";
import square from "../../images/Vector (1).png";
import direction from "../../images/Vector (2).png";
import { Link } from "react-router-dom";

export default function PropertyCard() {
  return (
    <div className="relative w-full rounded-[14px] overflow-hidden border-[1px] border-defaultBg ">
      <p className="absolute top-[20px] left-[20px] rounded-[15px] text-[12px] text-white bg-defTranspblack w-[90px] h-[26px] flex items-center justify-center">
        იყიდება
      </p>
      <Link to={`/real-estate/${1}`}>
        <img
          className="w-full h-[307px] object-cover"
          src={img}
          alt="property img"
        />
      </Link>
      <div className="flex flex-col gap-y-[20px] py-[22px] px-[25px]">
        <div className="flex flex-col gap-y-[6px]">
          <h1 className="text-[28px]">80 000 ₾</h1>
          <div className="flex items-center gap-[4px]">
            <img className="" src={location} alt="img" />
            <p className="text-defTranspblackText">თბილისი, ი.ჭავჭავაძის 53</p>
          </div>
        </div>
        <div className="flex items-center gap-[32px] text-defTranspblackText">
          <div className="flex items-center gap-[5px]">
            <img className="" src={bed} alt="img" />
            <p>2</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img className="" src={square} alt="img" />
            <p>55 მ²</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <img className="" src={direction} alt="img" />
            <p>0160</p>
          </div>
        </div>
      </div>
    </div>
  );
}
