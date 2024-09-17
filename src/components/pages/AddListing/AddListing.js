import React, { useState } from "react";
import Input1 from "../../inputs/Input1";
import OneImgUploader from "../../imgUploader/ImgUpload";
import TextArea1 from "../../inputs/TextArea1";
import DropDown1 from "../../DropDowns/DropDown1";
import { useNavigate } from "react-router-dom";
import Button1 from "../../buttons/button1";
import Button2 from "../../buttons/button2";

export default function AddListing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const type = ([
    {
      id: 1,
      name: "იყიდება",
    },
    {
      id: 2,
      name: "ქირავდება",
    },
  ]);

  const [addListingValues, setAddListingValues] = useState({
    type: "იყიდება",
    address: "",
    elIndex: "",
    region: "",
    city: "",
    price: "",
    area: "",
    bedroom: "",
    description: "",
    image: "",
    agent: "",
  });
  // const AddListing = () => {
  //   if (
  //     addListingValues.type &&
  //     addListingValues.address &&
  //     addListingValues.elIndex &&
  //     addListingValues.region &&
  //     addListingValues.city &&
  //     addListingValues.price &&
  //     addListingValues.area &&
  //     addListingValues.bedroom &&
  //     addListingValues.description &&
  //     addListingValues.image &&
  //     addListingValues.deagentscription
  //   ) {
  //     console.log("damateba");
  //   } else {
  //     console.log("araa");
  //   }
  // };

  return (
    <div className="pt-[81px] pb-[228px] flex flex-col items-center">
      <div className="w-[790px] flex flex-col gap-y-[80px] items-center ">
        <h1 className="text-[32px]">ლისტინგის დამატება</h1>
        <div className="flex flex-col gap-[32px] w-full">
          <h1 className="text-[#1A1A1F]">გარიგების ტიპი</h1>
          <div className="flex items-center gap-[60px]">
            {type.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setAddListingValues((prev) => ({
                    ...prev,
                    type: item.name,
                  }));
                }}
                className="flex items-center gap-[10px] cursor-pointer"
              >
                <div className="w-[17px] h-[17px] rounded-full flex items-center justify-center border-[1px] border-defblack">
                  <div
                    className={`w-[7px] h-[7px] rounded-full duration-100 ${
                      addListingValues.type === item.name ? "bg-defblack" : ""
                    }`}
                  ></div>
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="text-[#1A1A1F]">მისამართი</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                addListingValues.address && addListingValues.address.length < 2
                  ? true
                  : false
              }
              title="მისამართი *"
              height="h-[42px]"
              name="address"
              setAllValues={setAddListingValues}
            />
            <Input1
              underText="მხოლოდ რიცხვები"
              isError={
                addListingValues.elIndex && addListingValues.elIndex.length < 2
                  ? true
                  : false
              }
              digit={true}
              title="საფოსტო ინდექსი *"
              height="h-[42px]"
              name="elIndex"
              setAllValues={setAddListingValues}
            />

            <DropDown1
              title="რეგიონი"
              addagent={false}
              name="region"
              setAllValues={setAddListingValues}
            />
            <DropDown1
              title="ქალაქი"
              addagent={false}
              name="city"
              setAllValues={setAddListingValues}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="text-[#1A1A1F]">ბინის დეტალები</h1>
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-2 gap-[20px] w-full">
              <Input1
                underText="მხოლოდ რიცხვები"
                digit={true}
                title="ფასი"
                height="h-[42px]"
                name="price"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ რიცხვები"
                digit={true}
                title="ფართობი"
                height="h-[42px]"
                name="area"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ რიცხვები"
                isError={
                  addListingValues.bedroom &&
                  addListingValues.bedroom &&
                  !/^\d+$/.test(addListingValues.bedroom)
                    ? true
                    : false
                }
                digit={true}
                title="საძინებლების რაოდენობა *"
                height="h-[42px]"
                name="bedroom"
                setAllValues={setAddListingValues}
              />
            </div>
            <TextArea1
              height="min-h-[115px]"
              showUnderText="მინიმუმ ხუთი სიტყვა"
              title="აღწერა *"
              name="description"
              isError={
                addListingValues.description &&
                addListingValues.description.split(" ").length < 5
                  ? true
                  : false
              }
              setAllValues={setAddListingValues}
            />
            <div className="flex flex-col gap-y-[4px]">
              <h1 className="text-[14px]">ატვირთე ფოტო</h1>
              <div className="w-full h-[120px]">
                <OneImgUploader
                  inputName={""}
                  name="image"
                  setAllValues={setAddListingValues}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full ">
          <h1 className="text-[#1A1A1F]">აგენტი</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <DropDown1
              title="აირჩიე"
              addagent={true}
              name="agent"
              setAllValues={setAddListingValues}
            />
          </div>
        </div>
        <div className="flex items-center gap-[16px] w-full justify-end ">
          <Button2 text="გააუქმე" setAction={handleClick} icon={false} />
          <Button1 text="დაამატე ლისტინგი" setAction={""} icon={false} />
        </div>
      </div>
    </div>
  );
}
