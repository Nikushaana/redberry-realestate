import React, { useContext } from "react";
import x from "../../images/xlg.png";
import { ShareStatesCont } from "../contexts/sharedStates";
import Input1 from "../inputs/Input1";
import OneImgUploader from "../imgUploader/ImgUpload";

export default function AddAgentPopUp() {
  const { addAgentPopUp, setAddAgentPopUp } = useContext(ShareStatesCont);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center ${
        addAgentPopUp ? "z-50" : "z-[-5]"
      }`}
    >
      <div className="backdrop-blur-sm bg-[#02152657] w-full h-full absolute top-0 left-0"></div>
      <div
        className={`px-[80px] py-[87px] bg-white rounded-[20px] relative w-[1009px]`}
      >
        <div
          onClick={() => {
            setAddAgentPopUp(false);
          }}
          className="absolute top-[6px] right-[10px] w-[47px] h-[47px] flex items-center justify-center cursor-pointer"
        >
          <img className="w-[11px] h-[11px] object-contain" src={x} alt="img" />
        </div>

        <div
          className={`flex flex-col items-center gap-y-[30px] ${
            false && "pointer-events-none"
          }`}
        >
          <h1 className="text-[32px]">აგენტის დამატება</h1>
          <div className="flex flex-col gap-y-[20px]">
            <div className="grid grid-cols-2 gap-[20px] w-full">
              <Input1
                showUnderText="მინიმუმ ორი სიმბოლო"
                isError={false}
                title="სახელი *"
                height="h-[40px]"
              />
              <Input1
                showUnderText="მინიმუმ ორი სიმბოლო"
                isError={false}
                title="გვარი"
                height="h-[40px]"
              />
              <Input1
                showUnderText="გამოიყენეთ @redberry.ge ფოსტა"
                isError={false}
                title="ელ-ფოსტა *"
                height="h-[40px]"
              />
              <Input1
                showUnderText="მხოლოდ რიცხვები"
                isError={false}
                title="ტელეფონის ნომერი"
                height="h-[40px]"
                isNumber={true}
              />
            </div>
            <div className="flex flex-col gap-y-[4px]">
              <h1 className="text-[14px]">ატვირთე ფოტო</h1>
              <div className="w-full h-[120px]">
                <OneImgUploader inputName={""} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px] w-full justify-end">
            <div
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] border-[1px] border-defOrng text-defOrng`}
            >
              <p>გააუქმე</p>
            </div>
            <div
              className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] bg-defOrng active:bg-defOrngHvr text-white`}
            >
              <p>დაამატე აგენტი</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
