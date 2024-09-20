import React, { useContext, useEffect, useState, useMemo } from "react";
import PropertyCard from "../../cards/PropertyCard";
import { ShareStatesCont } from "../../contexts/sharedStates";
import Button1 from "../../buttons/button1";
import Button2 from "../../buttons/button2";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  const [valuesForQuery, setValuesForQuery] = useState({
    region: "",
    prices: {
      min: "",
      max: "",
    },
    areas: {
      min: "",
      max: "",
    },
    bedrooms: "",
  });
  const [valuesFromQuery, setValuesFromQuery] = useState({
    region: "",
    prices: {
      min: "",
      max: "",
    },
    areas: {
      min: "",
      max: "",
    },
    bedrooms: "",
  });

  useEffect(() => {
    const region = searchParams.get("region")
      ? searchParams
          .get("region")
          .split(",")
          .map((city) => city.trim())
      : "";
    setValuesFromQuery({
      region: region,
      prices: {
        min: searchParams.get("minPrice"),
        max: searchParams.get("maxPrice"),
      },
      areas: {
        min: searchParams.get("minArea"),
        max: searchParams.get("maxArea"),
      },
      bedrooms: searchParams.get("bedrooms"),
    });
  }, [searchParams]);

  const handleDeleteFilter = (name, value) => {
    const params = new URLSearchParams(searchParams);

    if (name === "region") {
      const updatedregion = valuesFromQuery.region.filter(
        (city) => city !== value
      );

      if (updatedregion.length > 0) {
        params.set("region", updatedregion.join(","));
      } else {
        params.delete("region");
      }
    }

    if (name === "price") {
      params.set("minPrice", "");
      params.set("maxPrice", "");
    }
    if (name === "area") {
      params.set("minArea", "");
      params.set("maxArea", "");
    }
    if (name === "bedrooms") {
      params.set("bedrooms", "");
    }
    if (name === "allFilter") {
      params.set("region", "");
      params.set("minPrice", "");
      params.set("maxPrice", "");
      params.set("minArea", "");
      params.set("maxArea", "");
      params.set("bedrooms", "");
    }

    navigate({
      pathname: "/",
      search: `?${params.toString()}`,
    });
  };

  const handleClick = () => {
    navigate("/add-listing");
  };

  const filteredData = useMemo(() => {
    const data = RealEstateData.filter((product) => {
      const { min: priceMin, max: priceMax } = valuesFromQuery.prices ?? {};
      const { min: areaMin, max: areaMax } = valuesFromQuery.areas ?? {};
      const { price, area } = product ?? {};
      if (
        priceMin ||
        priceMax ||
        areaMin ||
        areaMax ||
        valuesFromQuery.bedrooms ||
        valuesFromQuery.region
      ) {
        if (
          valuesFromQuery.region.includes(product.city.region.name) ||
          parseInt(product.bedrooms) === parseInt(valuesFromQuery.bedrooms)
        ) {
          return product;
        }
        if (priceMin && priceMax) {
          if (+price >= +priceMin && +price <= +priceMax) {
            return product;
          }
        } else if (priceMin && !priceMax) {
          if (+price >= +priceMin) {
            return product;
          }
        } else if (!priceMin && priceMax) {
          if (+price <= +priceMax) {
            return product;
          }
        }

        if (areaMin && areaMax) {
          if (+area >= +areaMin && +area <= +areaMax) {
            return product;
          }
        } else if (areaMin && !areaMax) {
          if (+area >= +areaMin) {
            return product;
          }
        } else if (!areaMin && areaMax) {
          if (+area <= +areaMax) {
            return product;
          }
        }

        return null;
      }

      return RealEstateData;
    });

    return data;
  }, [
    RealEstateData,
    valuesFromQuery.areas,
    valuesFromQuery.bedrooms,
    valuesFromQuery.prices,
    valuesFromQuery.region,
  ]);

  return (
    <div className="px-[162px] py-[81px] flex flex-col gap-y-[30px]">
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex items-center justify-between">
          <div className="h-[47px] rounded-[10px] border-[1px] border-defaultBg p-[6px] flex items-center gap-[24px]">
            <FilterDropDown
              text="რეგიონი"
              valuesForQuery={valuesForQuery}
              settAllValue={setValuesForQuery}
            />
            <FilterDropDown
              text="საფასო კატეგორია"
              valuesForQuery={valuesForQuery}
              settAllValue={setValuesForQuery}
            />
            <FilterDropDown
              text="ფართობი"
              valuesForQuery={valuesForQuery}
              settAllValue={setValuesForQuery}
            />
            <FilterDropDown
              text="საძინებლის რაოდენობა"
              valuesForQuery={valuesForQuery}
              settAllValue={setValuesForQuery}
            />
          </div>
          <div className="flex items-center gap-[16px]">
            <Button1 text="ლისტინგის დამატება" setAction={handleClick} />
            <Button2 text="აგენტის დამატება" setAction={handleAddAgentPopUp} />
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          {valuesFromQuery?.region?.length > 0 &&
            valuesFromQuery?.region.map((item) => (
              <div
                key={item}
                className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]"
              >
                <p>{item}</p>
                <img
                  onClick={() => {
                    handleDeleteFilter("region", item);
                  }}
                  className={`w-[14px] h-[14px] object-contain cursor-pointer `}
                  src={x}
                  alt="img"
                />
              </div>
            ))}
          {(valuesFromQuery?.areas?.min || valuesFromQuery?.areas?.max) && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>
                {valuesFromQuery?.areas?.min === ""
                  ? 0
                  : valuesFromQuery?.areas?.min}
                მ²
              </p>
              <p>-</p>
              <p>
                {valuesFromQuery?.areas?.max === ""
                  ? "∞"
                  : valuesFromQuery?.areas?.max}
                მ²
              </p>
              <img
                onClick={() => {
                  handleDeleteFilter("area");
                }}
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(valuesFromQuery?.prices?.min || valuesFromQuery?.prices?.max) && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>
                {valuesFromQuery?.prices?.min === ""
                  ? 0
                  : valuesFromQuery?.prices?.min}
                ₾
              </p>
              <p>-</p>
              <p>
                {valuesFromQuery?.prices?.max === ""
                  ? "∞"
                  : valuesFromQuery?.prices?.max}
                ₾
              </p>
              <img
                onClick={() => {
                  handleDeleteFilter("price");
                }}
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {valuesFromQuery?.bedrooms && (
            <div className="rounded-[43px] flex items-center border-[1px] border-defaultBg py-[6px] px-[10px] gap-[4px]">
              <p>{valuesFromQuery?.bedrooms}</p>
              <img
                onClick={() => {
                  handleDeleteFilter("bedrooms");
                }}
                className={`w-[14px] h-[14px] object-contain cursor-pointer`}
                src={x}
                alt="img"
              />
            </div>
          )}
          {(valuesFromQuery?.region?.length > 0 ||
            valuesFromQuery?.areas?.min ||
            valuesFromQuery?.areas?.max ||
            valuesFromQuery?.prices?.min ||
            valuesFromQuery?.prices?.max ||
            valuesFromQuery?.bedrooms) && (
            <h1
              onClick={() => {
                handleDeleteFilter("allFilter");
              }}
              className="text-[14px] cursor-pointer"
            >
              გასუფთავება
            </h1>
          )}
        </div>
      </div>
      <div>
        {RealEstateLoader ? (
          <div className="flex items-center w-[100%] h-[50px] text-defOrng justify-center pointer-events-none duration-200">
            <div className="w-[40px] h-[40px] flex items-center justify-center">
              <CustLoader />
            </div>
          </div>
        ) : RealEstateData?.length > 0 ? (
          filteredData?.length > 0 ? (
            <div className="grid grid-cols-4 gap-[20px] w-full">
              {filteredData.map((item) => (
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
