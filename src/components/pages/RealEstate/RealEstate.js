import React, { useContext, useEffect, useState } from "react";
import arrow from "../../../images/Icon Right.png";
import location from "../../../images/Icon.png";
import bed from "../../../images/bed.png";
import square from "../../../images/Vector (1).png";
import direction from "../../../images/Vector (2).png";
import phone from "../../../images/Vector (4).png";
import envelope from "../../../images/Shape.png";
import Slider1 from "../../sliders/slider1";
import { ShareStatesCont } from "../../contexts/sharedStates";
import Button4 from "../../buttons/button4";
import { Link, useParams } from "react-router-dom";
import { axiosUser } from "../../contexts/Axios/Axios";
import { RealEstateAxiosContext } from "../../contexts/realEstateCont";
import CustLoader from "../../custLoader/CustLoader";

export default function RealEstate() {
  const { setDelListPopUp } = useContext(ShareStatesCont);
  const { RealEstateData } = useContext(RealEstateAxiosContext);
  const { RealEstateId } = useParams();
  const [oneRealEstateData, setOneRealEstateData] = useState([]);
  const [oneRealEstateLoader, setOneRealEstateLoader] = useState(true);

  const [sameLocEstateData, setSameLocEstateData] = useState([]);

  useEffect(() => {
    setOneRealEstateLoader(true);
    axiosUser
      .get(`real-estates/${RealEstateId}`)
      .then(({ data }) => {
        setOneRealEstateData(data);
        setOneRealEstateLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [RealEstateId]);

  useEffect(() => {
    setSameLocEstateData(
      RealEstateData.filter(
        (item) =>
          item?.city?.region_id === oneRealEstateData?.city?.region_id &&
          item?.id !== oneRealEstateData?.id
      )
    );
  }, [RealEstateData, oneRealEstateData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Create a Date object
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year

    return `${day}/${month}/${year}`; // Return the formatted date
  };

  return (
    <div>
      {oneRealEstateLoader ? (
        <div className="flex items-center w-[100%] h-[50px] rounded-[10px] text-defOrng justify-center pointer-events-none border-[1px] duration-200">
          <div className="w-[40px] h-[40px] flex items-center justify-center">
            <CustLoader />
          </div>
        </div>
      ) : (
        <div className="px-[162px] pt-[81px] pb-[228px] flex flex-col gap-y-[60px]">
          <div className="flex flex-col gap-y-[30px]">
            <Link
              to="/"
              className="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
            >
              <img
                className="w-[90%] h-[90%] object-contain"
                src={arrow}
                alt="img"
              />
            </Link>
            <div className="flex gap-[68px]">
              <div className="w-[839px] flex flex-col gap-y-[10px]">
                <div className="w-full h-[670px] relative ">
                  <img
                    className="w-full h-full object-cover"
                    src={oneRealEstateData?.image}
                    alt="property img"
                  />
                  <p className="absolute top-[20px] left-[20px] rounded-full text-[20px] text-white bg-[#02152680] px-[20px] h-[40px] flex items-center justify-center">
                    {oneRealEstateData?.is_rental === 1
                      ? "იყიდება"
                      : "ქირავდება"}
                  </p>
                </div>
                <p className="text-defGray flex justify-end">
                  გამოქვეყნების თარიღი{" "}
                  {formatDate(oneRealEstateData?.created_at)}
                </p>
              </div>

              <div className="pt-[30px] flex flex-col gap-y-[24px] w-[calc(100%-839px)] max-w-[503px]">
                <h1 className="text-[48px] text-defblack">
                  {oneRealEstateData?.price} ₾
                </h1>
                <div className="flex flex-col gap-y-[16px]">
                  <div className="flex items-center gap-[4px]">
                    <img
                      className="w-[22px] h-[22px]"
                      src={location}
                      alt="img"
                    />
                    <p className="text-defGray text-[24px]">
                      {oneRealEstateData?.city?.name},{" "}
                      {oneRealEstateData?.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img className="w-[22px] h-[22px]" src={square} alt="img" />
                    <p className="text-defGray text-[24px]">
                      ფართი {oneRealEstateData?.area} მ²
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img className="w-[22px] h-[22px]" src={bed} alt="img" />
                    <p className="text-defGray text-[24px]">
                      საძინებელი {oneRealEstateData?.bedrooms}
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <img
                      className="w-[22px] h-[22px]"
                      src={direction}
                      alt="img"
                    />
                    <p className="text-defGray text-[24px]">
                      საფოსტო ინდექსი {oneRealEstateData?.zip_code}
                    </p>
                  </div>
                </div>

                <p className="text-defGray">{oneRealEstateData?.description}</p>
                <div className="rounded-[8px] border-[1px] border-defaultBg py-[24px] px-[20px] flex flex-col gap-y-[20px]">
                  <div className="flex items-center gap-[20px]">
                    <img
                      className="w-[72px] h-[72px] object-cover rounded-full"
                      src={oneRealEstateData?.agent?.avatar}
                      alt="img"
                    />
                    <div className="">
                      <p>
                        {oneRealEstateData?.agent?.name}{" "}
                        {oneRealEstateData?.agent?.surname}
                      </p>
                      <p className="text-[14px] text-[#676E76]">აგენტი</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-[5px]">
                      <img
                        className="w-[16px] h-[13px]"
                        src={envelope}
                        alt="img"
                      />
                      <p className="text-defGray text-[14px]">
                        {oneRealEstateData?.agent?.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img
                        className="w-[13px] h-[13px]"
                        src={phone}
                        alt="img"
                      />
                      <p className="text-defGray text-[14px]">
                        {oneRealEstateData?.agent?.phone}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <Button4
                  setAction={() => {
                    setDelListPopUp(oneRealEstateData?.id);
                  }}
                />
              </div>
            </div>
          </div>

          <Slider1 title={sameLocEstateData.length < 1 ? "ბინები მსგავს ლოკაციაზე არ მოიძებნა" : "ბინები მსგავს ლოკაციაზე"} data={sameLocEstateData} />
        </div>
      )}
    </div>
  );
}
