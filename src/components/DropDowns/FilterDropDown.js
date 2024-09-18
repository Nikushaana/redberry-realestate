import React, { useContext, useEffect, useRef, useState } from "react";
import DropDownButton from "../buttons/dropDownButton";
import RegionDrop from "./regionDrop/regionDrop";
import Button3 from "../buttons/button3";
import FromtoDrop from "./fromtoDrop/fromtoDrop";
import { ShareStatesCont } from "../contexts/sharedStates";

export default function FilterDropDown({ text }) {
  const { priceData, m2Data } = useContext(ShareStatesCont);
  const targetRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);

  const [allFilterValue, setallFilterValue] = useState({
    cities: [],
    prices: { from: "", to: "" },
    areas: { from: "", to: "" },
    bedroom: "",
  });

  useEffect(() => {
    setallFilterValue(allFilterValue);
  }, [allFilterValue]);

  const handleInputChange = (event) => {
    let newValue = event.target.value;

    newValue = newValue.replace(/[^0-9]/g, "");

    setallFilterValue((prev) => ({ ...prev, bedroom: newValue }));
  };

  const handleClickOutside = (event) => {
    if (targetRef.current && !targetRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={targetRef} className="relative">
      <DropDownButton
        text={text}
        dropDown={dropDown}
        setDropDown={setDropDown}
        style={`flex items-center gap-[4px] px-[14px] py-[8px] rounded-[6px] cursor-pointer duration-100 ${
          dropDown ? "bg-defFltrAct" : ""
        }`}
      />
      <div
        className={`border-[1px] border-defaultBg rounded-[10px] p-[24px] bg-white absolute left-[-6px] duration-150 flex flex-col items-end gap-y-[32px] ${
          dropDown
            ? "top-[50px] opacity-1 z-[2]"
            : "top-[30px] opacity-0 z-[-2]"
        }`}
      >
        {text === "რეგიონი" && (
          <RegionDrop setallFilterValue={setallFilterValue} />
        )}

        {text === "საფასო კატეგორია" && (
          <FromtoDrop
            text={text}
            setallFilterValue={setallFilterValue}
            name="prices"
            data1={priceData}
            data2={priceData}
          />
        )}
        {text === "ფართობი" && (
          <FromtoDrop
            text={text}
            setallFilterValue={setallFilterValue}
            name="areas"
            data1={m2Data}
            data2={m2Data}
          />
        )}
        {text === "საძინებლის რაოდენობა" && (
          <div className="flex flex-col items-start gap-y-[24px]">
            <h1 className="text-defblack">საძინებლის რაოდენობა</h1>
            <div
              className={`rounded-[6px] flex p-[10px] border-[1px] border-defGray items-center h-[40px] w-[40px]
             duration-100`}
            >
              <input
                onChange={handleInputChange}
                value={allFilterValue.bedroom}
                type="text"
                className={`select-none outline-none h-full w-full bg-transparent`}
              />
            </div>
          </div>
        )}

        <Button3 setAction={""} />
      </div>
    </div>
  );
}
