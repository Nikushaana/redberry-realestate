import React, { useContext, useState } from "react";
import x from "../../images/xlg.png";
import { ShareStatesCont } from "../contexts/sharedStates";

export default function DeleteListingPopUp() {
  const { delListPopUp, setDelListPopUp } = useContext(ShareStatesCont);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center ${
        delListPopUp ? "z-50" : "z-[-5]"
      }`}
    >
      <div className="backdrop-blur-sm bg-[#02152657] w-full h-full absolute top-0 left-0"></div>
      <div className={`px-[180px] py-[60px] bg-white rounded-[20px] relative`}>
        <div
          onClick={() => {
            setDelListPopUp(false);
          }}
          className="absolute top-[6px] right-[10px] w-[47px] h-[47px] flex items-center justify-center cursor-pointer"
        >
          <img className="w-[11px] h-[11px] object-contain" src={x} alt="img" />
        </div>

        <div
          className={`flex flex-col items-center gap-y-[30px] ${
            false && "pointer-events-none"
          }`}
        >
          <p className="text-[20px]">გსურთ წაშალოთ ლისტინგი?</p>
          <div className="flex items-center gap-[16px]">
            <div
              onClick={() => {
                setDelListPopUp(false);
              }}
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] border-[1px] border-defOrng text-defOrng`}
            >
              <p>გაუქმება</p>
            </div>
            <div
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] bg-defOrng active:bg-defOrngHvr text-white`}
            >
              <p>დადასტურება</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
