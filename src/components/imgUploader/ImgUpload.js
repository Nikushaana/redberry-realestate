import React, { useEffect, useState } from "react";
import trash from "../../images/trash-2.png";
import pluscrcl from "../../images/plus-circle.png";

export default function OneImgUploader({
  render,
  name,
  setAllValues,
}) {
  const [photo, setPhoto] = useState(null);

  const removePhoto = () => {
    setPhoto(null);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 1048576) {
        setPhoto(null);
      } else {
        setPhoto(selectedFile);
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
    <div
      className={`w-full h-full border-[1px] border-[#2D3648] border-dashed rounded-[8px] flex items-center justify-center`}
    >
      {photo ? (
        <div className="relative w-[92px] h-[82px] bg-[#F0F5F7]">
          <img
            src={URL.createObjectURL(photo)}
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
  );
}
