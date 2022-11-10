import React, { useEffect, useState } from "react";
import "./PaymentContainer.css";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import PaymentHeading from "./PaymentHeading";
import { useSelector } from "react-redux";

const PaymentContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);

  return (
    <div className="Payment_Setting_Container">
      <div
        className="Payment_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <PaymentHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default PaymentContainer;
