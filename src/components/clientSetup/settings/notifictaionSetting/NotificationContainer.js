import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./NotificationContainer.css";
import NotificationHeading from "./NotificationHeading";

const NotificationContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);
  return (
    <div className="Notification_Container">
      <div
        className="Notification_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
      >
        <Sidebar />
        <NotificationHeading />
        <RightSide />
      </div>
    </div>
  );
};

export default NotificationContainer;
