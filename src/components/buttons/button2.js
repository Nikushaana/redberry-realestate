import React from "react";
import { LuPlus } from "react-icons/lu";

export default function Button2({ setAction, text, icon }) {
  
  return (
    <div
      onClick={() => {
        setAction();
      }}
      className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] 
        rounded-[10px] border-[1px] border-defOrng hover:bg-defOrngHvr duration-150 text-defOrng hover:text-white`}
    >
      {icon && <LuPlus className="text-[18px]" />}
      <p>{text}</p>
    </div>
  );
}
