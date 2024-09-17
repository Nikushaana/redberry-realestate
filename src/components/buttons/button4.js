import React from "react";

export default function Button4({ setActiaon }) {
  return (
    <div
      onClick={() => {
        setActiaon(); 
      }}
      className={`flex items-center justify-center cursor-pointer h-[37px] w-[150px] text-[14px] rounded-[8px] border-[1px] border-defGray text-defGray duration-150 hover:bg-defGray hover:text-white`}
    >
      <p>ლისტინგის წაშლა</p>
    </div>
  );
}
