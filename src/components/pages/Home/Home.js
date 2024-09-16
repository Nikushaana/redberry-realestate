import React, { useContext } from "react";
import PropertyCard from "../../cards/PropertyCard";
import FilterDropDown from "../../DropDowns/FilterDropDown";
import pluss from "../../../images/ic_round-pluss.png";
import plus from "../../../images/ic_round-plus.png";
import { ShareStatesCont } from "../../contexts/sharedStates";
import x from "../../../images/x.png";
import { Link } from "react-router-dom";

export default function Home() {
  const { priceData, m2Data, setAddAgentPopUp } = useContext(ShareStatesCont);

  const fltrValues = ({
    cities: [
      { id: 1, name: "თბილისი" },
      { id: 2, name: "თელავი" },
    ],
    area: { from: "0", to: "100" },
    price: { from: "20000", to: "100000" },
    bedroom: "4",
  });
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
            <FilterDropDown text="რეგიონი" />
            <FilterDropDown
              text="საფასო კატეგორია"
              data1={priceData}
              data2={priceData}
            />
            <FilterDropDown text="ფართობი" data1={m2Data} data2={m2Data} />
            <FilterDropDown text="საძინებლის რაოდენობა" />
          </div>
          <div className="flex items-center gap-[16px]">
            <Link to={"/add-listing"}
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] bg-defOrng active:bg-defOrngHvr text-white`}
            >
              <img
                className="w-[22px] h-[22px] object-contain"
                src={pluss}
                alt="img"
              />
              <p>ლისტინგის დამატება</p>
            </Link>
            <div
              onClick={() => {
                setAddAgentPopUp(true);
              }}
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] border-[1px] border-defOrng text-defOrng`}
            >
              <img
                className="w-[22px] h-[22px] object-contain"
                src={plus}
                alt="img"
              />
              <p>აგენტის დამატება</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          {fltrValues.cities.length > 0 &&
            fltrValues.cities.map((item) => (
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
          {(fltrValues.area.from !== "" || fltrValues.area.to !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{fltrValues.area.from === "" ? 0 : fltrValues.area.from}მ²</p>
              <p>-</p>
              <p>{fltrValues.area.to === "" ? "∞" : fltrValues.area.to}მ²</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(fltrValues.price.from !== "" || fltrValues.price.to !== "") && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{fltrValues.price.from === "" ? 0 : fltrValues.price.from}₾</p>
              <p>-</p>
              <p>{fltrValues.price.to === "" ? "∞" : fltrValues.price.to}₾</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {fltrValues.bedroom !== "" && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{fltrValues.bedroom}</p>
              <img
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(fltrValues.cities.length > 0 ||
            fltrValues.area.from !== "" ||
            fltrValues.area.to !== "" ||
            fltrValues.price.from !== "" ||
            fltrValues.price.to !== "" ||
            fltrValues.bedroom !== "") && (
            <h1 className="text-[14px] cursor-pointer">გასუფთავება</h1>
          )}
        </div>
      </div>
      <div>
        {false ? (
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
