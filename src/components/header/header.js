import React from "react";
import Logo from "../../images/LOGO-02 3.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="px-[162px] py-[38px] border-[1px] border-defaultBg">
      <Link to="/" className="bg-[red]">
        <img
          className="w-[150px] h-[24px] object-contain"
          src={Logo}
          alt="logo"
        />
      </Link>
    </div>
  );
}
