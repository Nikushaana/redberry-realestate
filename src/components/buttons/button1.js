import React from "react";
import pluss from "../../images/ic_round-pluss.png";

export default function Button1({ setAction, text, icon, loader }) {
  return (
    <div
      onClick={(e) => {
        setAction(e);
      }}
      className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] duration-150 text-white ${loader ? "bg-[#f93a1da2]" : "bg-defOrng hover:bg-defOrngHvr"}`}
    >
      {icon && (
        <img
          className="w-[22px] h-[22px] object-contain"
          src={pluss}
          alt="img"
        />
      )}
      <p>{text}</p>
    </div>
  );
}
