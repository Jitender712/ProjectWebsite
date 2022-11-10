import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./PromoCodeContainer.css";
import PromoCodeHeading from "./PromoCodeHeading";

const PromoCodeContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="PromoCode_Container">
      <div
        className="PromoCode_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <PromoCodeHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default PromoCodeContainer;
