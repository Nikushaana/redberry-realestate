import React, { useContext, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { RegionsAxiosContext } from "../../contexts/regionsCont";
import { useSearchParams } from "react-router-dom";

export default function RegionDrop({ setallFilterValue }) {
  const { RegionsData } = useContext(RegionsAxiosContext);
  const [searchParams] = useSearchParams();

  const [toggledregion, settoggledregion] = useState([]);

  useEffect(() => {
    const region = searchParams?.get("region");

    // Ensure `region` is split into an array if it's a string
    if (region) {
      settoggledregion(region.split(",").map((city) => city.trim()));
    } else {
      settoggledregion([]);
    }
  }, [searchParams]);

  useEffect(() => {
    setallFilterValue((prev) => ({
      ...prev,
      region: toggledregion,
    }));
  }, [setallFilterValue, toggledregion]);

  const handleToggleCity = (cityName) => {
    if (toggledregion.includes(cityName)) {
      settoggledregion((prev) => prev.filter((city) => city !== cityName));
    } else {
      settoggledregion((prev) => [...prev, cityName]);
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
              onClick={() => handleToggleCity(item.name)}
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <div
                className={`w-[20px] h-[20px] text-white flex items-center overflow-hidden justify-center rounded-[2px] border-[1px] duration-100 ${
                  toggledregion?.includes(item.name)
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
