import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./DiscountContainer.css";
import DiscountHeading from "./DiscountHeading";

const DiscountContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="Discountpage_Container">
      <div
        className="Discountpage_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <DiscountHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default DiscountContainer;
