import React, { useContext, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { RegionsAxiosContext } from "../../contexts/regionsCont";

export default function RegionDrop({ setallFilterValue }) {
  const { RegionsData } = useContext(RegionsAxiosContext);

  const [toggledcities, settoggledcities] = useState([]);

  useEffect(() => {
    setallFilterValue(toggledcities);
  }, [setallFilterValue, toggledcities]);

  const handleToggleCity = (cityItem) => {
    if (toggledcities.includes(cityItem.name)) {
      settoggledcities((prev) =>
        prev.filter((cityName) => cityName !== cityItem.name)
      );
    } else {
      settoggledcities((prev) => [...prev, cityItem.name]);
    }
  };

  return (
    <div className="flex flex-col gap-y-[24px] w-[679px]">
      <h1 className="text-defblack">რეგიონის მიხედვით</h1>
      <div className="w-full grid grid-cols-3 gap-[50px] gap-y-[20px]">
        {RegionsData &&
          RegionsData?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleCity(item)}
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <div
                className={`w-[20px] h-[20px] text-white flex items-center overflow-hidden justify-center rounded-[2px] border-[1px] duration-100 ${
                  toggledcities.includes(item.name)
                    ? "bg-defGreen border-white"
                    : " border-defaultBg"
                }`}
              >
                <BsCheck />
              </div>
              <h1 className="text-[14px] text-defblack">{item.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
