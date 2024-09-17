import React, { useEffect, useRef, useState } from "react";
import DropDownButton from "../buttons/dropDownButton";

export default function FilterDropDown({ text, data1, data2 }) {
  const targetRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);

  // const [bedroom, setBedroom] = useState("");

  // const handleInputChange = (event) => {
  //   let newValue = event.target.value;

  //   newValue = newValue.replace(/[^0-9]/g, "");

  //   setBedroom(newValue);
  // };

  // const [city, setCity] = useState([
  //   {
  //     id:1,
  //     name: "თელავი"
  //   },
  //   {
  //     id:2,
  //     name: "თბილისი"
  //   },
  //   {
  //     id:3,
  //     name: "თელავივი"
  //   },
  //   {
  //     id:4,
  //     name: "თეირანი"
  //   },
  //   {
  //     id:5,
  //     name: "თალიბანი"
  //   },
  //   {
  //     id:6,
  //     name: "თაჯიკეთი"
  //   },
  //   {
  //     id:7,
  //     name: "რუსთავი"
  //   },
  //   {
  //     id:8,
  //     name: "მახინჯაური"
  //   },
  //   {
  //     id:9,
  //     name: "ვაკე"
  //   },
  // ])

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
          <div className="flex flex-col gap-y-[24px] w-[679px]">
            <h1 className="text-defblack">რეგიონის მიხედვით</h1>
            <div className="w-full grid grid-cols-3 gap-[50px] gap-y-[20px]">
              {/* {city && city?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-[8px] cursor-pointer"
                >
                  <div
                    className={`w-[20px] h-[20px] text-white flex items-center overflow-hidden justify-center rounded-[2px] border-[1px] ${
                      false ? "bg-defGreen border-white" : " border-defaultBg"
                    }`}
                  >
                    <img
                      className="w-[60%] h-[60%] object-contain"
                      src={check}
                      alt="img"
                    />
                  </div>
                  <h1 className="text-[14px] text-defblack">{item.name}</h1>
                </div>
              ))} */}
            </div>
          </div>
        )}
        {/* {(text === "საფასო კატეგორია" || text === "ფართობი") && (
          <div className="flex flex-col gap-y-[24px] w-[334px]">
            <h1 className="text-defblack">
              {text === "საფასო კატეგორია"
                ? "ფასის მიხედვით"
                : text === "ფართობი" && "ფართობის მიხედვით"}
            </h1>

            <FromToInput
              digit={true}
              lastIcon={
                text === "საფასო კატეგორია" ? (
                  <p className="text-[12px]">₾</p>
                ) : (
                  text === "ფართობი" && <p className="">მ²</p>
                )
              }
            />

            <div className={`grid grid-cols-2 gap-[20px] h-[calc(100%-40px)]`}>
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
                        setAllValues((prev) => ({
                          ...prev,
                          from: allValues.value1 === item.name ? "" : item.name,
                        }));
                      }}
                      className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration-100 select-none 
              ${
                item.name === allValues.value1
                  ? "font-semibold"
                  : "hover:font-semibold"
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
                        setAllValues((prev) => ({
                          ...prev,
                          from: allValues.value2 === item.name ? "" : item.name,
                        }));
                      }}
                      className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration select-none 
              ${
                item.name === allValues.value2
                  ? "font-semibold"
                  : "hover:font-semibold"
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
        )} */}
        {/* {text === "საძინებლის რაოდენობა" && (
          <div className="flex flex-col items-start gap-y-[24px]">
            <h1 className="text-defblack">საძინებლის რაოდენობა</h1>
            <div
              className={`rounded-[6px] flex p-[10px] border-[1px] border-defGray items-center h-[40px] w-[40px]
             duration-100`}
            >
              <input
                onChange={handleInputChange}
                value={bedroom}
                type="text"
                // name={name}
                className={`select-none outline-none h-full w-full bg-transparent`}
              />
            </div>
          </div>
        )} */}

        {/* <Button3 setAction={setDropDown((pre) => !pre)} /> */}
      </div>
    </div>
  );
}
