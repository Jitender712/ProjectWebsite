import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./AddBannerContainer.css";
import AddBannerHeading from "./AddBannerHeading";

const AddBannerContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  
  return (
    <div className="AddBanner_Container">
      <div
        className="AddBanner_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <AddBannerHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default AddBannerContainer;
