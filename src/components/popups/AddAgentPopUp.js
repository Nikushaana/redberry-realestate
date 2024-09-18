import React, { useContext, useState } from "react";
import { ShareStatesCont } from "../contexts/sharedStates";
import Input1 from "../inputs/Input1";
import OneImgUploader from "../imgUploader/ImgUpload";
import Button2 from "../buttons/button2";
import Button1 from "../buttons/button1";
import { axiosUser } from "../contexts/Axios/Axios";

export default function AddAgentPopUp() {
  const { addAgentPopUp, handleAddAgentPopUp } = useContext(ShareStatesCont);

  const [addAgentValues, setAddAgentValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const [addAgentRender, setAddAgentRender] = useState(false);

  const AddAgent = async (e) => {
    if (
      addAgentValues.name.length > 2 &&
      addAgentValues.surname.length > 2 &&
      addAgentValues.email.split("@")[1] === "redberry.ge" &&
      addAgentValues.phone.length === 9 
      // &&
      // String(addAgentValues.phone)[0] === "5"
    ) {
      e.preventDefault();
      const token = process.env.token;
      const formData = new FormData();
      formData.append("name", `${addAgentValues.name}`);
      formData.append("surname", `${addAgentValues.surname}`);
      formData.append("email", `${addAgentValues.email}`);
      formData.append("phone", `${addAgentValues.phone}`);
      formData.append("avatar", `${addAgentValues.avatar}`);
      console.log(token);
      
      axiosUser
        .post("agents", {
          formData,
          Authorization: `Bearer ${process.env.token}`,
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {})
        .catch((error) => {})
        .finally(() => {});
    } else {
      console.log("araa");
    }
  };

  const CloseAddAgentPopUp = () => {
    setAddAgentRender(true);
    handleAddAgentPopUp();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center ${
        addAgentPopUp ? "z-50" : "z-[-5]"
      }`}
    >
      <div className="backdrop-blur-sm bg-[#02152657] w-full h-full absolute top-0 left-0"></div>
      <form
        onSubmit={AddAgent}
        className={`flex flex-col items-center gap-y-[30px] px-[105px] py-[87px] bg-white rounded-[10px] relative w-[1009px] ${false &&
          "pointer-events-none"}`}
      >
        <h1 className="text-[32px] text-defblack">აგენტის დამატება</h1>
        <div className="flex flex-col gap-y-[20px] w-full">
          <div className="grid grid-cols-2 gap-[28px] w-full">
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                addAgentValues.name && addAgentValues.name.length < 2
                  ? true
                  : false
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
                addAgentValues.surname && addAgentValues.surname.length < 2
                  ? true
                  : false
              }
              title="გვარი"
              render={addAgentRender}
              height="h-[42px]"
              name="surname"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="გამოიყენეთ @redberry.ge ფოსტა"
              isError={
                addAgentValues.email &&
                addAgentValues.email.split("@")[1] !== "redberry.ge"
                  ? true
                  : false
              }
              title="ელ-ფოსტა*"
              render={addAgentRender}
              height="h-[42px]"
              name="email"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="მხოლოდ რიცხვები"
              isError={
                addAgentValues.phone &&
                addAgentValues.phone.length !== 9 &&
                String(addAgentValues.phone)[0] !== "5"
                  ? true
                  : false
              }
              title="ტელეფონის ნომერი"
              render={addAgentRender}
              height="h-[42px]"
              digit={true}
              name="phone"
              setAllValues={setAddAgentValues}
            />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <h1 className="text-[14px]">ატვირთე ფოტო</h1>
            <div className="w-full h-[120px]">
              <OneImgUploader
                inputName={"avatar"}
                name="avatar"
                render={addAgentRender}
                setAllValues={setAddAgentValues}
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
          />
        </div>
      </form>
    </div>
  );
}
