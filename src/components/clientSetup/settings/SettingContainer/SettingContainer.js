import React, { useEffect, useState } from "react";
import SettingHeading from "./SettingHeading";
import "./SettingContainer.css";
import Sidebar from "../../sideBar/SideBar";
import RightSide from "../../Profile/RightSide";
import { useSelector } from "react-redux";
const SettingContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="SettingContainer">
      <div
        className="SettingWrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <SettingHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default SettingContainer;
