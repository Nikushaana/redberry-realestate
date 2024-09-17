import React, { useContext } from "react";
import PropertyCard from "../../cards/PropertyCard";
import { ShareStatesCont } from "../../contexts/sharedStates";
import { useNavigate } from "react-router-dom";
import Button1 from "../../buttons/button1";
import Button2 from "../../buttons/button2";

export default function Home() {
  const { handleAddAgentPopUp } = useContext(ShareStatesCont);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-listing");
  };

  // const fltrValues = ({
  //   cities: [
  //     { id: 1, name: "თბილისი" },
  //     { id: 2, name: "თელავი" },
  //   ],
  //   area: { from: "0", to: "100" },
  //   price: { from: "20000", to: "100000" },
  //   bedroom: "4",
  // });
  // const [fltrValues, setFltrValues] = useState({
  //   cities: [
  //     { id: 1, name: "თბილისი" },
  //     { id: 2, name: "თელავი" },
  //   ],
  //   area: { from: "0", to: "100" },
  //   price: { from: "20000", to: "100000" },
  //   bedroom: "4",
  // });

  return (
    <div className="px-[162px] py-[81px] flex flex-col gap-y-[30px]">
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex items-center justify-between">
          <div className="h-[47px] rounded-[10px] border-[1px] border-defaultBg p-[6px] flex items-center gap-[24px]">
            {/* <FilterDropDown text="რეგიონი" /> */}
            {/* <FilterDropDown
              text="საფასო კატეგორია"
              data1={priceData}
              data2={priceData}
            />
            <FilterDropDown text="ფართობი" data1={m2Data} data2={m2Data} /> */}
            {/* <FilterDropDown text="საძინებლის რაოდენობა" /> */}
          </div>
          <div className="flex items-center gap-[16px]">
            <Button1 text="ლისტინგის დამატება" setAction={handleClick} />
            <Button2 text="აგენტის დამატება" setAction={handleAddAgentPopUp} />
          </div>
        </div>
        {/* <div className="flex items-center gap-[16px]">
          {mainFilterValues.cities.length > 0 &&
            mainFilterValues.cities.map((item) => (
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
          {(mainFilterValues.areaFrom !== "" || mainFilterValues.areaTo !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{mainFilterValues.areaFrom === "" ? 0 : mainFilterValues.areaFrom}მ²</p>
              <p>-</p>
              <p>{mainFilterValues.areaTo === "" ? "∞" : mainFilterValues.areaTo}მ²</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(mainFilterValues.priceFrom !== "" || mainFilterValues.priceTo !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{mainFilterValues.priceFrom === "" ? 0 : mainFilterValues.priceFrom}₾</p>
              <p>-</p>
              <p>{mainFilterValues.priceTo === "" ? "∞" : mainFilterValues.priceTo}₾</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {mainFilterValues.bedroom !== "" && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{mainFilterValues.bedroom}</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(mainFilterValues.cities.length > 0 ||
            mainFilterValues.areaFrom !== "" ||
            mainFilterValues.areaTo !== "" ||
            mainFilterValues.priceFrom !== "" ||
            mainFilterValues.priceTo !== "" ||
            mainFilterValues.bedroom !== "") && (
            <h1 className="text-[14px] cursor-pointer">გასუფთავება</h1>
          )}
        </div> */}
      </div>
      <div>
        {true ? (
          <div className="grid grid-cols-4 gap-[20px] w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <PropertyCard />
            ))}
          </div>
        ) : (
          <p className="text-[20px] text-[#021526CC] mt-[20px]">
            აღნიშნული მონაცემებით განცხადება არ იძებნება
          </p>
        )}
      </div>
    </div>
  );
}
