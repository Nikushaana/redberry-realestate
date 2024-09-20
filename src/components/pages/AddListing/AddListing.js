import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { Base64ToFile } from "../../base64ToFile/base64ToFile";
import { ShareStatesCont } from "../../contexts/sharedStates";

const saleValue = "იყიდება";

const initialState = {
  is_rental: saleValue,
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
};

export default function AddListing() {
  const { RegionsData } = useContext(RegionsAxiosContext);
  const { CitiesData } = useContext(CitiesAxiosContext);
  const { AgentsData } = useContext(AgentsAxiosContext);
  const { setNewRenderRealEstate } = useContext(RealEstateAxiosContext);
  const { addListingLoader, setAddListingLoader } = useContext(ShareStatesCont);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    localStorage.removeItem("addListingValues");
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

  const [addListingValues, setAddListingValues] = useState({
    ...initialState,
  });

  const [addListingErrors, setAddListingErrors] = useState({
    address: false,
    zip_code: false,
    region_id: false,
    city_id: false,
    price: false,
    area: false,
    bedrooms: false,
    description: false,
    image: false,
    agent_id: false,
  });

  useEffect(() => {
    if (addListingValues.address?.length >= 2) {
      setAddListingErrors((pre) => ({ ...pre, address: false }));
    }
    if (/^\d*$/.test(addListingValues.zip_code)) {
      setAddListingErrors((pre) => ({ ...pre, zip_code: false }));
    }
    if (addListingValues.region_id) {
      setAddListingErrors((pre) => ({ ...pre, region_id: false }));
    }
    if (addListingValues.city_id) {
      setAddListingErrors((pre) => ({ ...pre, city_id: false }));
    }
    if (/^\d*$/.test(addListingValues.price)) {
      setAddListingErrors((pre) => ({ ...pre, price: false }));
    }
    if (/^\d*$/.test(addListingValues.area)) {
      setAddListingErrors((pre) => ({ ...pre, area: false }));
    }
    if (/^\d+$/.test(addListingValues.bedrooms)) {
      setAddListingErrors((pre) => ({ ...pre, bedrooms: false }));
    }
    if (addListingValues.description?.split(" ").length >= 5) {
      setAddListingErrors((pre) => ({ ...pre, description: false }));
    }
    if (addListingValues.image) {
      setAddListingErrors((pre) => ({ ...pre, image: false }));
    }
    if (addListingValues.agent_id) {
      setAddListingErrors((pre) => ({ ...pre, agent_id: false }));
    }
    setAddListingLoader(false);
  }, [
    addListingValues.address?.length,
    addListingValues.agent_id,
    addListingValues.area,
    addListingValues.bedrooms,
    addListingValues.city_id,
    addListingValues.description,
    addListingValues.image,
    addListingValues.price,
    addListingValues.region_id,
    addListingValues.zip_code,
  ]);

  const isClean = useMemo(() => {
    const values = Object.values(addListingValues);
    return values.every((v) => v === saleValue || (v ?? "").length === 0);
  }, [addListingValues]);

  const [isDataLoaded, setIsDataLoaded] = useState(true);

  useEffect(() => {
    let getaddListingsValuesFromLocal = localStorage.getItem(
      "addListingValues"
    );
    if (getaddListingsValuesFromLocal) {
      let getaddListingsValuesFromLocalParsed = JSON.parse(
        getaddListingsValuesFromLocal
      );
      setAddListingValues(getaddListingsValuesFromLocalParsed);
    }
    setIsDataLoaded(false);
  }, []);

  useEffect(() => {
    if (isDataLoaded) return;
    if (!isClean) {
      let addListingValuesStringify = JSON.stringify(addListingValues);
      localStorage.setItem("addListingValues", addListingValuesStringify);
    }
  }, [addListingValues, isDataLoaded, isClean]);

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
      addListingValues.description?.split(" ").length >= 5 &&
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
      const imageFile = Base64ToFile(
        addListingValues.image,
        "listing_image.jpg"
      );
      formData.append("image", imageFile);
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
        .catch((error) => {
          setAddListingLoader(false);
        })
        .finally(() => {});
    } else {
      if (!addListingValues.agent_id) {
        setAddListingErrors((pre) => ({ ...pre, agent_id: true }));
        window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
      }
      if (!addListingValues.image) {
        setAddListingErrors((pre) => ({ ...pre, image: true }));
        window.scrollTo({ top: 800, left: 0, behavior: "smooth" });
      }
      if (
        !addListingValues.description ||
        addListingValues.description?.split(" ").length < 5
      ) {
        setAddListingErrors((pre) => ({ ...pre, description: true }));
        window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
      }
      if (!/^\d+$/.test(addListingValues.bedrooms)) {
        setAddListingErrors((pre) => ({ ...pre, bedrooms: true }));
        window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
      }
      if (!addListingValues.area || !/^\d*$/.test(addListingValues.area)) {
        setAddListingErrors((pre) => ({ ...pre, area: true }));
        window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
      }
      if (!addListingValues.price || !/^\d*$/.test(addListingValues.price)) {
        setAddListingErrors((pre) => ({ ...pre, price: true }));
        window.scrollTo({ top: 400, left: 0, behavior: "smooth" });
      }
      if (!addListingValues.city_id) {
        setAddListingErrors((pre) => ({ ...pre, city_id: true }));
        window.scrollTo({ top: 200, left: 0, behavior: "smooth" });
      }
      if (addListingValues.address?.length < 2) {
        setAddListingErrors((pre) => ({ ...pre, address: true }));
        window.scrollTo({ top: 200, left: 0, behavior: "smooth" });
      }
      if (
        !addListingValues.zip_code ||
        !/^\d*$/.test(addListingValues.zip_code)
      ) {
        setAddListingErrors((pre) => ({ ...pre, zip_code: true }));
        window.scrollTo({ top: 200, left: 0, behavior: "smooth" });
      }
      if (!addListingValues.region_id) {
        setAddListingErrors((pre) => ({ ...pre, region_id: true }));
        window.scrollTo({ top: 200, left: 0, behavior: "smooth" });
      }
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
          <h1 className="text-[#1A1A1F] myuppercase">ᲒᲐᲠᲘᲒᲔᲑᲘᲡ ᲢᲘᲞᲘ</h1>
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
                      addListingValues?.is_rental === item.name
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
          <h1 className="text-[#1A1A1F] myuppercase">ᲛᲓᲔᲑᲐᲠᲔᲝᲑᲐ</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              firstValue={addListingValues?.address}
              isError={
                (addListingValues?.address &&
                addListingValues?.address?.length < 2
                  ? true
                  : false) || addListingErrors.address
              }
              title="მისამართი *"
              height="h-[42px]"
              name="address"
              setAllValues={setAddListingValues}
            />
            <Input1
              underText="მხოლოდ რიცხვები"
              firstValue={addListingValues?.zip_code}
              isError={
                (addListingValues?.zip_code &&
                !/^\d*$/.test(addListingValues?.zip_code)
                  ? true
                  : false) || addListingErrors.zip_code
              }
              title="საფოსტო ინდექსი *"
              height="h-[42px]"
              name="zip_code"
              setAllValues={setAddListingValues}
            />

            <DropDown1
              title="რეგიონი *"
              addagent={false}
              name="region_id"
              isError={addListingErrors.region_id}
              firstValue={addListingValues?.region_id}
              data={RegionsData}
              setAllValues={setAddListingValues}
            />
            {addListingValues?.region_id && (
              <DropDown1
                title="ქალაქი *"
                firstValue={addListingValues?.city_id}
                data={CitiesData.filter(
                  (item) =>
                    item.region_id ===
                    RegionsData.find(
                      (item) => item.name === addListingValues?.region_id
                    )?.id
                )}
                addagent={false}
                render={addListingValues?.region_id}
                isError={addListingErrors.city_id}
                name="city_id"
                setAllValues={setAddListingValues}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full">
          <h1 className="text-[#1A1A1F] myuppercase">ᲑᲘᲜᲘᲡ ᲓᲔᲢᲐᲚᲔᲑᲘ</h1>
          <div className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-2 gap-[20px] w-full">
              <Input1
                underText="მხოლოდ რიცხვები"
                title="ფასი *"
                firstValue={addListingValues?.price}
                isError={
                  (addListingValues?.price &&
                  !/^\d*$/.test(addListingValues?.price)
                    ? true
                    : false) || addListingErrors.price
                }
                height="h-[42px]"
                name="price"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ რიცხვები"
                title="ფართობი *"
                firstValue={addListingValues?.area}
                isError={
                  (addListingValues?.area &&
                  !/^\d*$/.test(addListingValues?.area)
                    ? true
                    : false) || addListingErrors.area
                }
                height="h-[42px]"
                name="area"
                setAllValues={setAddListingValues}
              />
              <Input1
                underText="მხოლოდ მთელი რიცხვი"
                isError={
                  (addListingValues?.bedrooms &&
                  !/^\d+$/.test(addListingValues?.bedrooms)
                    ? true
                    : false) || addListingErrors.bedrooms
                }
                firstValue={addListingValues?.bedrooms}
                title="საძინებლების რაოდენობა *"
                height="h-[42px]"
                name="bedrooms"
                setAllValues={setAddListingValues}
              />
            </div>
            <TextArea1
              height="min-h-[115px]"
              UnderText="მინიმუმ ხუთი სიტყვა"
              title="აღწერა *"
              firstValue={addListingValues?.description}
              name="description"
              isError={
                (addListingValues?.description &&
                addListingValues?.description?.split(" ").length < 5
                  ? true
                  : false) || addListingErrors.description
              }
              setAllValues={setAddListingValues}
            />
            <div className="flex flex-col gap-y-[4px]">
              <h1 className="text-[14px]">ატვირთე ფოტო *</h1>
              <div className="w-full ">
                <OneImgUploader
                  firstValue={addListingValues?.image}
                  name="image"
                  UnderText="სავალდებულო"
                  setAllValues={setAddListingValues}
                  isError={addListingErrors.image}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[22px] w-full ">
          <h1 className="text-[#1A1A1F] myuppercase">ᲐᲒᲔᲜᲢᲘ</h1>
          <div className="grid grid-cols-2 gap-[20px] w-full">
            <DropDown1
              title="აირჩიე *"
              addagent={true}
              name="agent_id"
              isError={addListingErrors.agent_id}
              firstValue={addListingValues?.agent_id}
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
