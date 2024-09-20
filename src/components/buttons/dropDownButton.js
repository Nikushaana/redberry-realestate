import React from "react";
import arrow from "../../images/arrow.png";

export default function DropDownButton({
  text,
  dropDown,
  setDropDown,
  style,
  isH1,
}) {
  return (
    <div
      onClick={() => {
        setDropDown((pre) => !pre);
      }}
      className={`${style} `}
    >
      {isH1 ? <h1>{text}</h1> : <p>{text}</p>}

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
