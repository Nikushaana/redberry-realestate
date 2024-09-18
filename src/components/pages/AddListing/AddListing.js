import React, { useContext, useState } from "react";
import Input1 from "../../inputs/Input1";
import OneImgUploader from "../../imgUploader/ImgUpload";
import TextArea1 from "../../inputs/TextArea1";
import DropDown1 from "../../DropDowns/DropDown1";
import Button1 from "../../buttons/button1";
import Button2 from "../../buttons/button2";
import { useNavigate } from "react-router-dom";
import { RegionsAxiosContext } from "../../contexts/regionsCont";
import { CitiesAxiosContext } from "../../contexts/citiesCont";
import { AgentsAxiosContext } from "../../contexts/agentsCont";
import { axiosUser } from "../../contexts/Axios/Axios";
import { RealEstateAxiosContext } from "../../contexts/realEstateCont";

export default function AddListing() {
  const { RegionsData } = useContext(RegionsAxiosContext);
  const { CitiesData } = useContext(CitiesAxiosContext);
  const { AgentsData } = useContext(AgentsAxiosContext);
  const { setNewRenderRealEstate } = useContext(RealEstateAxiosContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const type = [
    {
      id: 2,
      name: "იყიდება",
    },
    {
      id: 1,
      name: "ქირავდება",
    },
  ];

  const [addListingLoader, setAddListingLoader] = useState(false);

  const [addListingValues, setAddListingValues] = useState({
    is_rental: "იყიდება",
    address: "",
    zip_code: "",
    region_id: "",
    city_id: "",
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    image: "",
    agent_id: "",
  });

  const AddListing = async (e) => {
    setAddListingLoader(true);
    if (
      addListingValues.is_rental &&
      addListingValues.address?.length >= 2 &&
      /^\d*$/.test(addListingValues.zip_code) &&
      addListingValues.region_id &&
      addListingValues.city_id &&
      /^\d*$/.test(addListingValues.price) &&
      /^\d*$/.test(addListingValues.area) &&
      /^\d+$/.test(addListingValues.bedrooms) &&
      addListingValues.description.split(" ").length >= 5 &&
      addListingValues.image &&
      addListingValues.agent_id
    ) {
      e.preventDefault();
      const formData = new FormData();
      formData.append(
        "is_rental",
        parseInt(
          type.find((item) => item.name === addListingValues.is_rental)?.id - 1
        )
      );
      formData.append("address", addListingValues.address);
      formData.append("zip_code", addListingValues.zip_code);
      formData.append(
        "region_id",
        parseInt(
          RegionsData.find((item) => item.name === addListingValues.region_id)
            ?.id
        )
      );
      formData.append(
        "city_id",
        parseInt(
          CitiesData.find((item) => item.name === addListingValues.city_id)?.id
        )
      );
      formData.append("price", addListingValues.price);
      formData.append("area", addListingValues.area);
      formData.append("bedrooms", addListingValues.bedrooms);
      formData.append("description", addListingValues.description);
      formData.append("image", addListingValues.image);
      formData.append(
        "agent_id",
        parseInt(
          AgentsData.find((item) => item.name === addListingValues.agent_id)?.id
        )
      );

      axiosUser
        .post("real-estates", formData)
        .then((res) => {
          handleClick();
          setNewRenderRealEstate(res);
        })
        .catch((error) => {})
        .finally(() => {
          setAddListingLoader(false);
        });
    } else {
      setAddListingLoader(false);
    }
  };

  return (
    <div className="pt-[81px] pb-[228px] flex flex-col items-center">
      <form
        onSubmit={AddListing}
        className="w-[790px] flex flex-col gap-y-[80px] items-center "
      >
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
                    is_rental: item.name,
                  }));
                }}
                className="flex items-center gap-[10px] cursor-pointer"
              >
                <div className="w-[17px] h-[17px] rounded-full flex items-center justify-center border-[1px] border-defblack">
                  <div
                    className={`w-[7px] h-[7px] rounded-full duration-100 ${
                      addListingValues.is_rental === item.name
                        ? "bg-defblack"
                        : ""
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
                addListingValues.zip_code &&
                !/^\d*$/.test(addListingValues.zip_code)
                  ? true
                  : false
              }
              title="საფოსტო ინდექსი *"
              height="h-[42px]"
              name="zip_code"
              setAllValues={setAddListingValues}
            />

            <DropDown1
              title="რეგიონი"
              addagent={false}
              name="region_id"
              data={RegionsData}
              setAllValues={setAddListingValues}
            />
            {addListingValues.region_id && (
              <DropDown1
                title="ქალაქი"
                data={CitiesData.filter(
                  (item) =>
                    item.region_id ===
                    RegionsData.find(
                      (item) => item.name === addListingValues.region_id
                    )?.id
                )}
                addagent={false}
                render={addListingValues.region_id}
                name="city_id"
                setAllValues={setAddListingValues}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="text-[#1A1A1F]">ბინის დეტალები</h1>
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-2 gap-[20px] w-full">
              <Input1
                underText="მხოლოდ რიცხვები"
                title="ფასი"
                isError={
                  addListingValues.price &&
                  !/^\d*$/.test(addListingValues.price)
                    ? true
                    : false
                }
                height="h-[42px]"
                name="price"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ რიცხვები"
                title="ფართობი"
                isError={
                  addListingValues.area && !/^\d*$/.test(addListingValues.area)
                    ? true
                    : false
                }
                height="h-[42px]"
                name="area"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ მთელი რიცხვი"
                isError={
                  addListingValues.bedrooms &&
                  !/^\d+$/.test(addListingValues.bedrooms)
                    ? true
                    : false
                }
                title="საძინებლების რაოდენობა *"
                height="h-[42px]"
                name="bedrooms"
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
              name="agent_id"
              data={AgentsData}
              setAllValues={setAddListingValues}
            />
          </div>
        </div>
        <div className="flex items-center gap-[16px] w-full justify-end ">
          <Button2 text="გააუქმე" setAction={handleClick} icon={false} />
          <Button1
            text="დაამატე ლისტინგი"
            setAction={(e) => {
              AddListing(e);
            }}
            icon={false}
            loader={addListingLoader}
          />
        </div>
      </form>
    </div>
  );
}
