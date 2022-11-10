import React, { useEffect, useState } from "react";
import OrderHeading from "./OrderHeading";
import "./OrderContainer.css";
import Sidebar from "../../sideBar/SideBar";
import RightSide from "../../Profile/RightSide";
import { useSelector } from "react-redux";

const OrderContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);

  return (
    <div className="OrderPage_Setting_Container">
      <div
        className="OrderPage_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <OrderHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default OrderContainer;
