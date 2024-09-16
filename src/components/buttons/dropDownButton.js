import React from "react";
import arrow from "../../images/arrow.png";

export default function DropDownButton({ text, dropDown, setDropDown, style }) {
  return (
    <div
      onClick={() => {
        setDropDown((pre) => !pre);
      }}
      className={`${style} `}
    >
      <h1>{text}</h1>

      <img
        className={`w-[14px] h-[14px] object-contain duration-100 ${
          dropDown ? "rotate-[180deg]" : ""
        }`}
        src={arrow}
        alt="ing"
      />
    </div>
  );
}
