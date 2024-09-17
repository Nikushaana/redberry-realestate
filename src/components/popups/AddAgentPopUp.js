import React, { useContext, useState } from "react";
import { ShareStatesCont } from "../contexts/sharedStates";
import Input1 from "../inputs/Input1";
import OneImgUploader from "../imgUploader/ImgUpload";
import Button2 from "../buttons/button2";
import Button1 from "../buttons/button1";

export default function AddAgentPopUp() {
  const { addAgentPopUp, handleAddAgentPopUp } = useContext(ShareStatesCont);

  const [addAgentValues, setAddAgentValues] = useState({
    agent_fname: "",
    agent_lname: "",
    agent_email: "",
    agent_phone: "",
    agent_image: "",
  });

  const [addAgentRender, setAddAgentRender] = useState(false);

  const AddAgent = () => {
    if (
      addAgentValues.agent_fname &&
      addAgentValues.agent_lname &&
      addAgentValues.agent_email &&
      addAgentValues.agent_phone &&
      // addAgentValues.agent_image &&
      addAgentValues.agent_fname.length > 2 &&
      addAgentValues.agent_lname.length > 2 &&
      addAgentValues.agent_email.split("@")[1] === "redberry.ge" &&
      addAgentValues.agent_phone.length === 11
    ) {
      console.log("damateba");
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
      <div
        className={`flex flex-col items-center gap-y-[30px] px-[105px] py-[87px] bg-white rounded-[10px] relative w-[1009px] ${false &&
          "pointer-events-none"}`}
      >
        <h1 className="text-[32px] text-defblack">აგენტის დამატება</h1>
        <div className="flex flex-col gap-y-[20px] w-full">
          <div className="grid grid-cols-2 gap-[28px] w-full">
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                addAgentValues.agent_fname &&
                addAgentValues.agent_fname.length < 2
                  ? true
                  : false
              }
              title="სახელი *"
              render={addAgentRender}
              height="h-[42px]"
              name="agent_fname"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="მინიმუმ ორი სიმბოლო"
              isError={
                addAgentValues.agent_lname &&
                addAgentValues.agent_lname.length < 2
                  ? true
                  : false
              }
              title="გვარი"
              render={addAgentRender}
              height="h-[42px]"
              name="agent_lname"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="გამოიყენეთ @redberry.ge ფოსტა"
              isError={
                addAgentValues.agent_email &&
                addAgentValues.agent_email.split("@")[1] !== "redberry.ge"
                  ? true
                  : false
              }
              title="ელ-ფოსტა*"
              render={addAgentRender}
              height="h-[42px]"
              name="agent_email"
              setAllValues={setAddAgentValues}
            />
            <Input1
              underText="მხოლოდ რიცხვები"
              isError={
                addAgentValues.agent_phone &&
                addAgentValues.agent_phone.length !== 11
                  ? true
                  : false
              }
              title="ტელეფონის ნომერი"
              render={addAgentRender}
              height="h-[42px]"
              isNumber={true}
              name="agent_phone"
              setAllValues={setAddAgentValues}
            />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <h1 className="text-[14px]">ატვირთე ფოტო</h1>
            <div className="w-full h-[120px]">
              <OneImgUploader
                inputName={"agent_image"}
                name="agent_image"
                render={addAgentRender}
                setAllValues={setAddAgentValues}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[16px] w-full justify-end">
          <Button2 text="გააუქმე" setAction={CloseAddAgentPopUp} icon={false} />
          <Button1 text="დაამატე აგენტი" setAction={AddAgent} icon={false} />
        </div>
      </div>
    </div>
  );
}
