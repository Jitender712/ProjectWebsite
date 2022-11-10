import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../Profile/RightSide";
import Sidebar from "../sideBar/SideBar";
import "./DashBoardConatiner.css";
import MainDash from "./MainDash/MainDash";

function DashBoardContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="Container">
      <div
        className="Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default DashBoardContainer;
