import React, { useEffect, useState } from "react";

export default function FromToInput({
  value1,
  setvalue1,
  value2,
  setvalue2,
  lastIcon,
  isNumber,
  digit,
}) {
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event, setValue) => {
    const { value } = event.target;
    let newValue = value;

    if (isNumber) {
      newValue = newValue?.replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    if (digit) {
      newValue = newValue?.replace(/[^0-9]/g, "");
    }

    setValue(newValue);
  };

  useEffect(() => {
    const fromValue = parseInt(value1?.replace(/\s/g, ""), 10);
    const toValue = parseInt(value2?.replace(/\s/g, ""), 10);

    if (fromValue && toValue && fromValue > toValue) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [value1, value2]);

  return (
    <div className="flex flex-col gap-y-[8px] ">
      <div className="grid grid-cols-2 gap-[15px]">
        <div
          className={`rounded-[6px] w-[155px] h-[42px] border-[1px] p-[10px] flex items-center
         gap-[10px] duration-150 ${
           isError ? " border-defOrng" : " border-defGray"
         }`}
        >
          <input
            onChange={(e) => handleInputChange(e, setvalue1)}
            value={value1}
            type="text"
            name="from"
            placeholder="დან"
            className={`select-none outline-none h-[90%] w-full bg-transparent`}
          />
          {lastIcon && lastIcon}
        </div>
        <div
          className={`rounded-[6px] w-[155px] h-[42px] border-[1px] p-[10px] flex items-center
         gap-[10px] duration-150 ${
           isError ? " border-defOrng" : " border-defGray"
         }`}
        >
          <input
            onChange={(e) => handleInputChange(e, setvalue2)}
            value={value2}
            type="text"
            name="to"
            placeholder="მდე"
            className={`select-none outline-none h-[90%] w-full bg-transparent`}
          />
          {lastIcon && lastIcon}
        </div>
      </div>
      {isError && (
        <div className={`flex items-center text-defOrng`}>
          <p className={`text-[12px]`}>ჩაწერეთ ვალიდური მონაცემი</p>
        </div>
      )}
    </div>
  );
}
