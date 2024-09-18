import React, { useContext, useState } from "react";
import PropertyCard from "../../cards/PropertyCard";
import { ShareStatesCont } from "../../contexts/sharedStates";
import Button1 from "../../buttons/button1";
import Button2 from "../../buttons/button2";
import { useNavigate } from "react-router-dom";
import x from "../../../images/x.png";
import FilterDropDown from "../../DropDowns/FilterDropDown";
import { RealEstateAxiosContext } from "../../contexts/realEstateCont";
import CustLoader from "../../custLoader/CustLoader";

export default function Home() {
  const { handleAddAgentPopUp } = useContext(ShareStatesCont);
  const { RealEstateData, RealEstateLoader } = useContext(
    RealEstateAxiosContext
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-listing");
  };

  const filteredHouses = RealEstateData;

  const cities = [
    {
      id: 1,
      name: "თელავი",
    },
    {
      id: 2,
      name: "თბილისი",
    },
  ];

  const area = {
    from: "50",
    to: "150",
  };
  const price = {
    from: "50000",
    to: "150000",
  };

  const bedroom = "4";

  return (
    <div className="px-[162px] py-[81px] flex flex-col gap-y-[30px]">
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex items-center justify-between">
          <div className="h-[47px] rounded-[10px] border-[1px] border-defaultBg p-[6px] flex items-center gap-[24px]">
            <FilterDropDown
              text="რეგიონი"
            />
            <FilterDropDown
              text="საფასო კატეგორია"
            />
            <FilterDropDown
              text="ფართობი"
            />
            <FilterDropDown
              text="საძინებლის რაოდენობა"
            />
          </div>
          <div className="flex items-center gap-[16px]">
            <Button1 text="ლისტინგის დამატება" setAction={handleClick} />
            <Button2 text="აგენტის დამატება" setAction={handleAddAgentPopUp} />
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          {cities.length > 0 &&
            cities.map((item) => (
              <div
                key={item.id}
                className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]"
              >
                <p>{item.name}</p>
                <img
                  className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                  src={x}
                  alt="img"
                />
              </div>
            ))}
          {(area.from !== "" || area.to !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>
                {area.from === "" ? 0 : area.from}
                მ²
              </p>
              <p>-</p>
              <p>
                {area.to === "" ? "∞" : area.to}
                მ²
              </p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(price.from !== "" || price.to !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{price.from === "" ? 0 : price.from}₾</p>
              <p>-</p>
              <p>{price.to === "" ? "∞" : price.to}₾</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {bedroom !== "" && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{bedroom}</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(cities.length > 0 ||
            area.from !== "" ||
            area.from !== "" ||
            price.from !== "" ||
            price.to !== "" ||
            bedroom !== "") && (
            <h1 className="text-[14px] cursor-pointer">გასუფთავება</h1>
          )}
        </div>
      </div>
      <div>
        {RealEstateLoader ? (
          <div className="flex items-center w-[100%] h-[50px] rounded-[10px] text-defOrng justify-center pointer-events-none border-[1px] duration-200">
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <CustLoader />
            </div>
          </div>
        ) : RealEstateData.length > 0 ? (
          filteredHouses.length > 0 ? (
            <div className="grid grid-cols-4 gap-[20px] w-full">
              {filteredHouses.map((item) => (
                <PropertyCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-[20px] text-[#021526CC] mt-[20px]">
              აღნიშნული მონაცემებით განცხადება არ იძებნება
            </p>
          )
        ) : (
          <p className="text-[20px] text-[#021526CC] mt-[20px]">
            განცხადებები არ არის დამატებული
          </p>
        )}
      </div>
    </div>
  );
}
