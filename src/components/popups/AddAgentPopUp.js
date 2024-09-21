import React, { useContext, useEffect, useState } from "react";
import { ShareStatesCont } from "../contexts/sharedStates";
import Input1 from "../inputs/Input1";
import OneImgUploader from "../imgUploader/ImgUpload";
import Button2 from "../buttons/button2";
import Button1 from "../buttons/button1";
import { axiosUser } from "../contexts/Axios/Axios";
import { AgentsAxiosContext } from "../contexts/agentsCont";
import { Base64ToFile } from "../base64ToFile/base64ToFile";

export default function AddAgentPopUp() {
  const { addAgentPopUp, handleAddAgentPopUp } = useContext(ShareStatesCont);
  const { setNewRenderAgents } = useContext(AgentsAxiosContext);

  const [addAgentValues, setAddAgentValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [addAgentRender, setAddAgentRender] = useState();
  const [addAgentLoader, setAddAgentLoader] = useState(false);
  const [addAgentError, setAddAgentError] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
    avatar: false,
  });

  useEffect(() => {
    if (addAgentValues.name?.length > 2) {
      setAddAgentError((pre) => ({ ...pre, name: false }));
    }
    if (addAgentValues.surname?.length > 2) {
      setAddAgentError((pre) => ({ ...pre, surname: false }));
    }
    if (addAgentValues.email.split("@")[1] === "redberry.ge") {
      setAddAgentError((pre) => ({ ...pre, email: false }));
    }
    if (addAgentValues.phone?.length === 9) {
      setAddAgentError((pre) => ({ ...pre, phone: false }));
    }
    if (String(addAgentValues.phone)[0] === "5") {
      setAddAgentError((pre) => ({ ...pre, phone: false }));
    }
    if (addAgentValues.avatar) {
      setAddAgentError((pre) => ({ ...pre, avatar: false }));
    }
  }, [
    addAgentValues.avatar,
    addAgentValues.email,
    addAgentValues.name?.length,
    addAgentValues.phone,
    addAgentValues.surname?.length,
  ]);

  const CloseAddAgentPopUp = () => {
    setAddAgentRender(Date);
    handleAddAgentPopUp();
  };

  const AddAgent = async (e) => {
    setAddAgentLoader(true);
    if (
      addAgentValues.name?.length >= 2 &&
      addAgentValues.surname?.length >= 2 &&
      addAgentValues.email.split("@")[1] === "redberry.ge" &&
      addAgentValues.phone?.length === 9 &&
      String(addAgentValues.phone)[0] === "5" &&
      addAgentValues.avatar
    ) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", addAgentValues.name);
      formData.append("surname", addAgentValues.surname);
      formData.append("email", addAgentValues.email);
      formData.append("phone", addAgentValues.phone);
      const imageFile = Base64ToFile(
        addAgentValues.avatar,
        "listing_image.jpg"
      );
      formData.append("avatar", imageFile);

      axiosUser
        .post("agents", formData)
        .then((res) => {
          CloseAddAgentPopUp(res);
          setNewRenderAgents(res);
        })
        .catch((error) => {})
        .finally(() => {
          setAddAgentLoader(false);
        });
    } else {
      if (addAgentValues.name?.length < 2) {
        setAddAgentError((pre) => ({ ...pre, name: true }));
      }
      if (addAgentValues.surname?.length < 2) {
        setAddAgentError((pre) => ({ ...pre, surname: true }));
      }
      if (addAgentValues.email.split("@")[1] !== "redberry.ge") {
        setAddAgentError((pre) => ({ ...pre, email: true }));
      }
      if (addAgentValues.phone?.length !== 9) {
        setAddAgentError((pre) => ({ ...pre, phone: true }));
      }
      if (String(addAgentValues.phone)[0] !== "5") {
        setAddAgentError((pre) => ({ ...pre, phone: true }));
      }
      if (!addAgentValues.avatar) {
        setAddAgentError((pre) => ({ ...pre, avatar: true }));
      }
      setAddAgentLoader(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center ${
        addAgentPopUp ? "z-50" : "z-[-5]"
      }`}
    >
      <div
        onClick={() => CloseAddAgentPopUp()}
        className="backdrop-blur-sm bg-[#02152657] w-full h-full absolute top-0 left-0"
      ></div>
      <form
        onSubmit={AddAgent}
        className={`flex flex-col items-center gap-y-[30px] px-[105px] py-[87px] bg-white rounded-[10px] relative w-[1009px] ${addAgentLoader &&
          "pointer-events-none"}`}
      >
        <h1 className="text-[32px] text-defblack">აგენტის დამატება</h1>
        <div className="flex flex-col gap-y-[20px] w-full">
          <div className="grid grid-cols-2 gap-[28px] w-full">
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                (addAgentValues.name && addAgentValues.name?.length < 2
                  ? true
                  : false) || addAgentError.name
              }
              title="სახელი *"
              render={addAgentRender}
              height="h-[42px]"
              name="name"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                (addAgentValues.surname && addAgentValues.surname?.length < 2
                  ? true
                  : false) || addAgentError.surname
              }
              title="გვარი *"
              render={addAgentRender}
              height="h-[42px]"
              name="surname"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="გამოიყენეთ @redberry.ge ფოსტა"
              isError={
                (addAgentValues.email &&
                addAgentValues.email.split("@")[1] !== "redberry.ge"
                  ? true
                  : false) || addAgentError.email
              }
              title="ელ-ფოსტა *"
              render={addAgentRender}
              height="h-[42px]"
              name="email"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="მხოლოდ რიცხვები"
              isError={
                (addAgentValues.phone &&
                (addAgentValues.phone?.length !== 9 ||
                  String(addAgentValues.phone)[0] !== "5")
                  ? true
                  : false) || addAgentError.phone
              }
              title="ტელეფონის ნომერი *"
              render={addAgentRender}
              height="h-[42px]"
              digit={true}
              name="phone"
              setAllValues={setAddAgentValues}
            />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <h1 className="text-[14px]">ატვირთე ფოტო *</h1>
            <div className="w-full h-[120px]">
              <OneImgUploader
                name="avatar"
                render={addAgentRender}
                setAllValues={setAddAgentValues}
                isError={addAgentError.avatar}
                UnderText="სავალდებულო"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[16px] w-full justify-end">
          <Button2 text="გააუქმე" setAction={CloseAddAgentPopUp} icon={false} />
          <Button1
            text="დაამატე აგენტი"
            setAction={(e) => {
              AddAgent(e);
            }}
            icon={false}
            loader={addAgentLoader}
          />
        </div>
      </form>
    </div>
  );
}
