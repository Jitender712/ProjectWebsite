import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleFalse,
  setToggleTrue,
} from "../../redux/action/SidebarAction";

const Menu = () => {
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;
  // console.log("Value", NewValue);
  const dispatch = useDispatch();
  const HandleOnClick = () => {
    NewValue && "undefined"
      ? dispatch(setToggleFalse(false))
      : dispatch(setToggleTrue(true));
  };
  return (
    <div>
      <MenuIcon
        onClick={HandleOnClick}
        style={{ cursor: "Pointer", fontSize: 40, margin: 5 }}
      />
    </div>
  );
};

export default Menu;
