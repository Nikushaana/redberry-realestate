import React from "react";

export default function Button3({setAction}) {
  return (

    <div
      onClick={() => {
        setAction();
      }}
      className={`flex items-center justify-center cursor-pointer h-[33px] w-[77px] text-[14px] rounded-[8px] bg-defOrng hover:bg-defOrngHvr duration-150 text-white
          `}
    >
      <p>არჩევა</p>
    </div>
  );
}
