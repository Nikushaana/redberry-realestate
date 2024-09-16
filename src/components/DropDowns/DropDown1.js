import React, { useEffect, useRef, useState } from "react";
import DropDownButton from "../buttons/dropDownButton";

export default function DropDown1({
  firstValue,
  render,
  title,
  name,
  setAllValues,
}) {
  const targetRef = useRef();
  const [dropDown, setDropDown] = useState(true);

  const [value, setValue] = useState("");

  const [data, setdata] = useState([
    {
      id: 1,
      name: "giorga",
    },
    {
      id: 2,
      name: "giorga",
    },
    {
      id: 3,
      name: "giorga",
    },
    {
      id: 4,
      name: "giorga",
    },
    {
      id: 5,
      name: "giorga",
    },
    {
      id: 6,
      name: "giorga",
    },
    {
      id: 7,
      name: "giorga",
    },
    {
      id: 8,
      name: "giorga",
    },
    {
      id: 9,
      name: "giorga",
    },
    {
      id: 10,
      name: "giorga",
    },
    {
      id: 11,
      name: "giorga",
    },
  ]);

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
    <div className="flex flex-col gap-y-[4px] ">
      {title && <h1 className="text-[14px]">{title}</h1>}

      <div ref={targetRef} className="relative">
        <DropDownButton
          text={value}
          dropDown={dropDown}
          setDropDown={setDropDown}
          style={`flex items-center w-full justify-between px-[14px] h-[42px] cursor-pointer border-[1px] border-defGray duration-200 ${
            dropDown ? "rounded-t-[6px]" : "rounded-[6px]"
          }`}
        />
        <div
          style={{
            height: `${
              dropDown ? data?.length > 4 ? 168 : data?.length * 42 : 0
            }px`,
          }}
          className={`border-[1px] w-full  border-defGray border-t-0 rounded-b-[6px] top-[42px] bg-white absolute  left-0 duration-200 flex flex-col ${
            dropDown ? "opacity-1 z-[2] " : "opacity-0 z-[-2]"
          } ${data?.length > 4 && "overflow-y-scroll"}`}
        >
          {data.map((item, index) => (
            <div
              key={item}
              onClick={() => setValue(item.name)}
              className={`min-h-[42px] h-[42px] flex items-center px-[14px]  border-defGray ${
                data.length === index + 1 ? "" : "border-b-[1px]"
              }`}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
