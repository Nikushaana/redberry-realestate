import React, { useEffect, useRef, useState } from "react";
import DropDownButton from "../buttons/dropDownButton";
import check from "../../images/Vector (3).png";
import Input1 from "../inputs/Input1";

export default function FilterDropDown({ text, placeholder, data1, data2 }) {
  const targetRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleInputChange = (event) => {
    let newText = event.target.value;

    newText = newText.replace(/[^0-9]/g, "");

    setValue1(newText);
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
        className={`border-[1px] border-defaultBg rounded-[10px] p-[24px] bg-white absolute left-[-6px] duration-200 flex flex-col items-end gap-y-[32px] ${
          dropDown
            ? "top-[50px] opacity-1 z-[2]"
            : "top-[30px] opacity-0 z-[-2]"
        }`}
      >
        {text === "რეგიონი" && (
          <div className="flex flex-col gap-y-[24px] w-[730px]">
            <h1>რეგიონის მიხედვით</h1>
            <div className="w-full grid grid-cols-3 gap-[50px] gap-y-[20px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-[8px] cursor-pointer"
                >
                  <div
                    className={`w-[20px] h-[20px] text-white flex items-center justify-center border-[1px] ${
                      true ? "bg-defGreen border-white" : " border-defGray"
                    }`}
                  >
                    <img
                      className="w-[60%] h-[60%] object-contain"
                      src={check}
                      alt="img"
                    />
                  </div>
                  <h1 className="text-[14px]">ქართლი</h1>
                </div>
              ))}
            </div>
          </div>
        )}
        {(text === "საფასო კატეგორია" || text === "ფართობი") && (
          <div className="flex flex-col gap-y-[24px] w-[382px]">
            <h1 className="">
              {text === "საფასო კატეგორია"
                ? "ფასის მიხედვით"
                : text === "ფართობი" && "ფართობის მიხედვით"}
            </h1>
            <div className="grid grid-cols-2 gap-[20px]">
              <Input1
                placeholder="დან"
                digit={true}
                isError={false}
                showUnderText={false}
                firstValue={value1}
                height="h-[42px]"
                lastIcon={
                  text === "საფასო კატეგორია" ? (
                    <p className="text-[12px]">₾</p>
                  ) : (
                    text === "ფართობი" && <p className="">მ²</p>
                  )
                }
              />
              <Input1
                placeholder="მდე"
                digit={true}
                isError={false}
                showUnderText={false}
                firstValue={value2}
                height="h-[42px]"
                lastIcon={
                  text === "საფასო კატეგორია" ? (
                    <p className="text-[12px]">₾</p>
                  ) : (
                    text === "ფართობი" && <p className="">მ²</p>
                  )
                }
              />
            </div>
            <div
              className={`grid grid-cols-2 gap-[20px] ${
                placeholder === "ფასი" || placeholder === "გარბენი"
                  ? "h-[calc(100%-70px)]"
                  : "h-[calc(100%-40px)]"
              }`}
            >
              <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[14px]">
                  {text === "საფასო კატეგორია"
                    ? "მინ. ფასი"
                    : text === "ფართობი" && "მინ. მ²"}
                </h1>
                <div className="">
                  {data1?.map((item) => (
                    <p
                      key={item.id}
                      onClick={() => {
                        setValue1(value1 === item.name ? "" : item.name);
                      }}
                      className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration-100 select-none 
              ${
                item.name === value1 ? "font-semibold" : "hover:font-semibold"
              }`}
                    >
                      {item.name}{" "}
                      {text === "საფასო კატეგორია"
                        ? "₾"
                        : text === "ფართობი" && "მ²"}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[14px]">
                  {text === "საფასო კატეგორია"
                    ? "მაქს. ფასი"
                    : text === "ფართობი" && "მაქს. მ²"}
                </h1>
                <div className="">
                  {data2?.map((item) => (
                    <p
                      key={item.id}
                      onClick={() => {
                        setValue2(value2 === item.name ? "" : item.name);
                      }}
                      className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration select-none 
              ${
                item.name === value2 ? "font-semibold" : "hover:font-semibold"
              }`}
                    >
                      {item.name}{" "}
                      {text === "საფასო კატეგორია"
                        ? "₾"
                        : text === "ფართობი" && "მ²"}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {text === "საძინებლის რაოდენობა" && (
          <div className="flex flex-col items-start gap-y-[24px]">
            <h1>საძინებლის რაოდენობა</h1>
            <div
              className={`rounded-[6px] flex p-[10px] border-[1px] border-defGray items-center h-[40px] w-[40px]
             duration-100`}
            >
              <input
                onChange={handleInputChange}
                value={value1}
                type="text"
                // name={name}
                placeholder={placeholder}
                className={`select-none outline-none h-full w-full bg-transparent`}
              />
            </div>
          </div>
        )}
        <div
          onClick={() => {
            setDropDown((pre) => !pre);
          }}
          className={`flex items-center justify-center gap-[2px] cursor-pointer h-[33px] px-[16px] text-[14px] rounded-[10px] bg-defOrng active:bg-defOrngHvr text-white
          `}
        >
          <p>არჩევა</p>
        </div>
      </div>
    </div>
  );
}
