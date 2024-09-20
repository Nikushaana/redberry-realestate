import React, { useEffect, useState } from "react";
import trash from "../../images/trash-2.png";
import pluscrcl from "../../images/plus-circle.png";
import checkgreen from "../../images/Vector (5).png";
import checkred from "../../images/Vector (6).png";
import checkdef from "../../images/Vector (7).png";

export default function OneImgUploader({
  firstValue,
  render,
  name,
  setAllValues,
  isError,
  UnderText,
}) {
  const [photo, setPhoto] = useState(null);
  const [isLarge, setIsLarge] = useState(false);

  const removePhoto = () => {
    setPhoto(null);
  };

  useEffect(() => {
    if (firstValue) {
      setPhoto(firstValue);
    }
  }, [firstValue]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 1048576) {
        setPhoto(null);
        setIsLarge(true);
      } else {
        setIsLarge(false);
        const FR = new FileReader();

        FR.addEventListener("load", function(evt) {
          setPhoto(evt.target.result);
        });

        FR.readAsDataURL(selectedFile);
      }
    }
  };

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev) => ({ ...prev, [name]: photo }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  useEffect(() => {
    if (render) {
      setPhoto(null);
    }
  }, [render]);

  return (
    <div className="flex flex-col gap-y-[5px] ">
      <div
        className={`w-full h-[120px] border-[1px] border-dashed rounded-[8px] flex items-center justify-center ${
          isError || isLarge ? " border-defOrng" : " border-[#2D3648]"
        }`}
      >
        {photo ? (
          <div className="relative w-[92px] h-[82px] bg-[#F0F5F7]">
            <img
              src={photo}
              alt="img"
              className="w-full h-full object-cover rounded-[4px]"
            />
            <button
              className="absolute bottom-[-5px] right-[-5px] bg-white w-[24px] h-[24px] flex items-center justify-center rounded-full border-[1px] border-defblack cursor-pointer"
              onClick={removePhoto}
            >
              <img
                className="w-[11px] h-[11px] object-contain"
                src={trash}
                alt="img"
              />
            </button>
          </div>
        ) : (
          <label
            className={`flex items-center justify-center h-full w-full cursor-pointer`}
          >
            <input
              name={name}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*"
            />
            <img
              className="w-[24px] h-[24px] object-contain"
              src={pluscrcl}
              alt="img"
            />
          </label>
        )}
      </div>
      <div
        className={`flex items-center gap-[7px] ${
          isError || isLarge ? "text-defOrng" : photo ? "text-defGreen" : "text-defblack"
        }`}
      >
        <img
          className={``}
          src={isError || isLarge ? checkred : photo ? checkgreen : checkdef}
          alt="ing"
        />{" "}
        <p className={`text-[14px]`}>
          {isLarge ? "არ უნდა აღებმატებოდეს 1mb-ის ზომაში" : UnderText}
        </p>
      </div>
    </div>
  );
}
