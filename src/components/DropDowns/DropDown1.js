import React, { useContext, useEffect, useRef, useState } from "react";
import DropDownButton from "../buttons/dropDownButton";
import pluscrcl from "../../images/plus-circle.png";
import { ShareStatesCont } from "../contexts/sharedStates";

export default function DropDown1({
  firstValue,
  render,
  title,
  name,
  setAllValues,
  addagent,
}) {
  const { setAddAgentPopUp } = useContext(ShareStatesCont);
  const targetRef = useRef();
  const [dropDown, setDropDown] = useState(false);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev) => ({ ...prev, [name]: value }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setValue(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setValue("");
    }
  }, [render]);

  const data = [
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
  ];

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
              dropDown
                ? addagent
                  ? data?.length > 3
                    ? 168
                    : data?.length * 42 + 42
                  : data?.length > 4
                  ? 168
                  : data?.length * 42
                : 0
            }px`,
          }}
          className={`border-[1px] w-full  border-defGray border-t-0 rounded-b-[6px] top-[42px] bg-white absolute  left-0 duration-200 flex flex-col ${
            dropDown ? "opacity-1 z-[2] " : "opacity-0 z-[-2]"
          } ${
            addagent
              ? data?.length > 3 && "overflow-y-scroll showyScroll"
              : data?.length > 4 && "overflow-y-scroll showyScroll"
          }`}
        >
          {addagent && (
            <div
              onClick={() => {
                setAddAgentPopUp(true);
              }}
              className={`min-h-[42px] h-[42px] cursor-pointer flex items-center gap-[8px] px-[14px]  border-defGray 
                border-b-[1px]
              `}
            >
              <img
                className="w-[24px] h-[24px] object-contain"
                src={pluscrcl}
                alt="img"
              />
              <p>დაამატე აგენტი</p>
            </div>
          )}
          {data.map((item, index) => (
            <div
              key={item}
              onClick={() => setValue(item.name)}
              className={`min-h-[42px] h-[42px] flex items-center px-[14px]  border-defGray cursor-pointer ${
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
