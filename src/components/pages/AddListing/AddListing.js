import React from "react";
import Input1 from "../../inputs/Input1";
import OneImgUploader from "../../imgUploader/ImgUpload";
import TextArea1 from "../../inputs/TextArea1";
import DropDown1 from "../../DropDowns/DropDown1";

export default function AddListing() {
  return (
    <div className="pt-[81px] pb-[228px] flex flex-col items-center">
      <div className="w-[790px] flex flex-col gap-y-[80px] items-center ">
        <h1 className="text-[32px]">ლისტინგის დამატება</h1>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="">მდებარეობა</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <Input1
              showUnderText="მინიმუმ ორი სიმბოლო"
              isError={false}
              title="მისამართი *"
              height="h-[42px]"
            />
            <Input1
              showUnderText="მხოლოდ რიცხვები"
              isError={false}
              title="საფოსტო ინდექსი *"
              height="h-[42px]"
            />

            <DropDown1 title="რეგიონი" />
            <DropDown1 title="კახეთი" />
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="">ბინის დეტალები</h1>
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-2 gap-[20px] w-full">
              <Input1
                showUnderText="მხოლოდ რიცხვები"
                isError={false}
                title="ფასი"
                height="h-[42px]"
              />
              <Input1
                showUnderText="მხოლოდ რიცხვები"
                isError={false}
                title="ფართობი"
                height="h-[42px]"
              />
              <Input1
                showUnderText="მხოლოდ რიცხვები"
                isError={false}
                title="საძინებლების რაოდენობა *"
                height="h-[42px]"
              />
            </div>
            <TextArea1
              height="min-h-[115px]"
              showUnderText="მინიმუმ ხუთი სიტყვა"
              title="აღწერა *"
            />
            <div className="flex flex-col gap-y-[4px]">
              <h1 className="text-[14px]">ატვირთე ფოტო</h1>
              <div className="w-full h-[120px]">
                <OneImgUploader inputName={""} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full ">
          <h1 className="">აგენტი</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <DropDown1 title="აირჩიე" />
          </div>
        </div>
        <div className="flex items-center gap-[16px] w-full justify-end ">
          <div
            className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] border-[1px] border-defOrng text-defOrng`}
          >
            <p>გააუქმე</p>
          </div>
          <div
            className={`flex items-center justify-center gap-[2px] cursor-pointer h-[47px] px-[16px] rounded-[10px] bg-defOrng active:bg-defOrngHvr text-white`}
          >
            <p>დაამატე ლისტინგი</p>
          </div>
        </div>
      </div>
    </div>
  );
}
