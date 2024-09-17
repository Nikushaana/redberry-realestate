import React, { useContext } from "react";
import arrow from "../../../images/Icon Right.png";
import estateimg from "../../../images/Frame 103.png";
import girlimg from "../../../images/Beautiful young woman looking serious.png";
import location from "../../../images/Icon.png";
import bed from "../../../images/bed.png";
import square from "../../../images/Vector (1).png";
import direction from "../../../images/Vector (2).png";
import phone from "../../../images/Vector (4).png";
import envelope from "../../../images/Shape.png";
import { Link } from "react-router-dom";
import Slider1 from "../../sliders/slider1";
import { ShareStatesCont } from "../../contexts/sharedStates";
import Button4 from "../../buttons/button4";

export default function RealEstate() {
  const { handleDelListPopUp } = useContext(ShareStatesCont);

  return (
    <div className="px-[162px] pt-[81px] pb-[228px] flex flex-col gap-y-[60px]">
      <div className="flex flex-col gap-y-[30px]">
        <Link
          to="/"
          className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
        >
          <img
            className="w-[90%] h-[90%] object-contain"
            src={arrow}
            alt="img"
          />
        </Link>
        <div className="flex gap-[68px]">
          <div className="w-[839px] flex flex-col gap-y-[10px]">
            <div className="w-full h-[670px] relative ">
              <img
                className="w-full h-full object-cover"
                src={estateimg}
                alt="property img"
              />
              <p className="absolute top-[20px] left-[20px] rounded-full text-[20px] text-white bg-[#02152680] px-[20px] h-[40px] flex items-center justify-center">
                იყიდება
              </p>
            </div>
            <p className="text-defGray flex justify-end">
              გამოქვეყნების თარიღი 08/08/24
            </p>
          </div>

          <div className="pt-[30px] flex flex-col gap-y-[24px] w-[calc(100%-839px)] max-w-[503px]">
            <h1 className="text-[48px] text-defblack">80 000 ₾</h1>
            <div className="flex flex-col gap-y-[16px]">
              <div className="flex items-center gap-[4px]">
                <img className="w-[22px] h-[22px]" src={location} alt="img" />
                <p className="text-defGray text-[24px]">
                  თბილისი, ი.ჭავჭავაძის 53
                </p>
              </div>
              <div className="flex items-center gap-[4px]">
                <img className="w-[22px] h-[22px]" src={square} alt="img" />
                <p className="text-defGray text-[24px]">ფართი 55 მ²</p>
              </div>
              <div className="flex items-center gap-[4px]">
                <img className="w-[22px] h-[22px]" src={bed} alt="img" />
                <p className="text-defGray text-[24px]">საძინებელი 2</p>
              </div>
              <div className="flex items-center gap-[4px]">
                <img className="w-[22px] h-[22px]" src={direction} alt="img" />
                <p className="text-defGray text-[24px]">საფოსტო ინდექსი 2525</p>
              </div>
            </div>

            <p className="text-defGray">
              იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
              ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.{" "}
            </p>
            <div className="rounded-[8px] border-[1px] border-defaultBg py-[24px] px-[20px] flex flex-col gap-y-[20px]">
              <div className="flex items-center gap-[20px]">
                <img
                  className="w-[72px] h-[72px] object-cover"
                  src={girlimg}
                  alt="img"
                />
                <div className="">
                  <p>სოფიო აგენტი</p>
                  <p className="text-[14px] text-[#676E76]">აგენტი</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[5px]">
                  <img className="w-[16px] h-[13px]" src={envelope} alt="img" />
                  <p className="text-defGray text-[14px]">
                    sophio.gelovani@redberry.ge
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <img className="w-[13px] h-[13px]" src={phone} alt="img" />
                  <p className="text-defGray text-[14px]">577 777 777</p>
                </div>
              </div>
            </div>

            <Button4 setActiaon={handleDelListPopUp} />
          </div>
        </div>
      </div>

      <Slider1 title="ბინები მსგავს ლოკაციაზე" />
    </div>
  );
}
