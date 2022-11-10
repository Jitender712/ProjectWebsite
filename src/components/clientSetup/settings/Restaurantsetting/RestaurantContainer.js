import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../Profile/RightSide";
import Sidebar from "../../sideBar/SideBar";
import "./RestaurantContainer.css";
import RestaurantHeading from "./RestaurantHeading";

const RestaurantContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);

  return(
    <div className="Restaurant_Setting_Container">
        <div className="Restaurant_Wrapper"
        style={{
          gridTemplateColumns: isOpen ? "12rem auto 25rem" : "5rem auto 25rem",
        }}
        >
            <Sidebar/>
            <RestaurantHeading/>
            <RightSide/>
        </div>
    </div>
  )
};

export default RestaurantContainer;
