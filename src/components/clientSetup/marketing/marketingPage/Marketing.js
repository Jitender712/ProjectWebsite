import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./Marketing.css";
import MarketingHeading from "./MarketingHeading";

const Marketing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="Marketting_Container">
      <div
        className="Marketting_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <MarketingHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default Marketing;
