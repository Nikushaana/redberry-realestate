import React, { useEffect, useState } from "react";
import checkgreen from "../../images/Vector (5).png";
import checkred from "../../images/Vector (6).png";
import checkdef from "../../images/Vector (7).png";

export default function TextArea1({
  firstValue,
  render,
  placeholder,
  title,
  name,
  setAllValues,
  isNumber,
  digit,
  height,
  isError,
  showUnderText,
}) {
  const [inputText, setInputText] = useState();

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev) => ({ ...prev, [name]: inputText }));
    }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setInputText("");
    }
  }, [render]);

  const handleInputChange = (event) => {
    let newText = event.target.value;

    if (isNumber) {
      newText = newText
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    if (digit) {
      newText = newText.replace(/[^0-9]/g, "");
    }

    setInputText(newText);
  };

  return (
    <div className="flex flex-col gap-y-[4px] ">
      {title && <h1 className="text-[14px]">{title}</h1>}
      <div
        className={`rounded-[6px] w-full border-[1px] outline-none p-[10px] flex items-center
         gap-[10px] duration-100 ${
           isError ? " border-defOrng" : " border-defGray"
         }`}
      >
        <textarea
          onChange={handleInputChange}
          value={inputText}
          type="text"
          name={name}
          placeholder={placeholder}
          className={`select-none outline-none ${height} w-full bg-transparent`}
        />
      </div>
      {showUnderText && (
        <div
          className={`flex items-center gap-[7px] ${
            inputText ? isError ? "text-defOrng" : "text-defGreen" : "text-defblack"
          }`}
        >
          <img className={``} src={inputText ? isError ? checkred : checkgreen : checkdef} alt="ing" />{" "}
          <p className={`text-[14px]`}>
            {inputText
              ? isError
                ? "ჩაწერეთ ვალიდური მონაცემი"
                : showUnderText
              : showUnderText}
          </p>
        </div>
      )}
    </div>
  );
}
