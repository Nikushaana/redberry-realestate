import React, { useEffect, useState } from "react";
import FromToInput from "../../inputs/FromToInput";
import { useSearchParams } from "react-router-dom";

export default function FromtoDrop({
  text,
  data1,
  data2,
  setallFilterValue,
  name,
}) {
  const [searchParams] = useSearchParams();

  const [value1, setvalue1] = useState("");
  const [value2, setvalue2] = useState("");

  useEffect(() => {
    setvalue1(text === "საფასო კატეგორია" ? searchParams.get("minPrice") : searchParams.get("minArea"));
    setvalue2(text === "საფასო კატეგორია" ? searchParams.get("maxPrice") : searchParams.get("maxArea"));
  }, [searchParams, text]);

  useEffect(() => {
    setallFilterValue((prev) => ({
      ...prev,
      [name]: { min: value1, max: value2 },
    }));
  }, [name, setallFilterValue, value1, value2]);

  return (
    <div className="flex flex-col gap-y-[24px] w-[334px]">
      <h1 className="text-defblack">
        {text === "საფასო კატეგორია"
          ? "ფასის მიხედვით"
          : text === "ფართობი" && "ფართობის მიხედვით"}
      </h1>

      <FromToInput
        value1={value1}
        setvalue1={setvalue1}
        value2={value2}
        setvalue2={setvalue2}
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
                  setvalue1(value1 === item.name ? "" : item.name);
                }}
                className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration-100 select-none 
              ${
                item.name === value1 ? "font-semibold" : "hover:font-semibold"
              }`}
              >
                {item.name}
                {text === "საფასო კატეგორია" ? "₾" : text === "ფართობი" && "მ²"}
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
                  setvalue2(value2 === item.name ? "" : item.name);
                }}
                className={`flex items-center w-full text-[14px] 
                        truncate cursor-pointer duration select-none 
              ${
                item.name === value2 ? "font-semibold" : "hover:font-semibold"
              }`}
              >
                {item.name}{" "}
                {text === "საფასო კატეგორია" ? "₾" : text === "ფართობი" && "მ²"}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
