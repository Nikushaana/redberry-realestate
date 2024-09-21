import React, { useContext, useState } from "react";
import x from "../../images/xlg.png";
import { ShareStatesCont } from "../contexts/sharedStates";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import { axiosUser } from "../contexts/Axios/Axios";
import { RealEstateAxiosContext } from "../contexts/realEstateCont";
import { useNavigate } from "react-router-dom";

export default function DeleteListingPopUp() {
  const { setNewRenderRealEstate } = useContext(RealEstateAxiosContext);
  const { delListPopUp, setDelListPopUp } = useContext(ShareStatesCont);
  
  const navigate = useNavigate();
  const [delListLoader, setDelListLoader] = useState(false);

  const DeleteListing = () => {
    setDelListLoader(true);
    axiosUser
      .delete(`real-estates/${delListPopUp}`)
      .then((res) => {
        setNewRenderRealEstate(res);
        setDelListPopUp("");
        navigate("/");
      })
      .catch((err) => {})
      .finally(() => {
        setDelListLoader(false);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center ${
        delListPopUp !== "" ? "z-50" : "z-[-5]"
      } ${delListLoader && "pointer-events-none"}`}
    >
      <div
        onClick={() => {
          setDelListPopUp("");
        }}
        className="backdrop-blur-sm bg-[#02152657] w-full h-full absolute top-0 left-0"
      ></div>
      <div className={`px-[180px] py-[60px] bg-white rounded-[20px] relative`}>
        <div
          onClick={() => {
            setDelListPopUp("");
          }}
          className="absolute top-[6px] right-[10px] w-[47px] h-[47px] flex items-center justify-center cursor-pointer"
        >
          <img className="w-[11px] h-[11px] object-contain" src={x} alt="img" />
        </div>

        <div
          className={`flex flex-col items-center gap-y-[30px] ${false &&
            "pointer-events-none"}`}
        >
          <p className="text-[20px]">გსურთ წაშალოთ ლისტინგი?</p>
          <div className="flex items-center gap-[16px]">
            <Button2
              text="გაუქმება"
              setAction={() => {
                setDelListPopUp("");
              }}
              icon={false}
            />
            <Button1
              text="დადასტურება"
              setAction={DeleteListing}
              icon={false}
              loader={delListLoader}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
