import React, { useState, useEffect } from "react";
import "./SideBar.css";
import "./SideBar1.css";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Logo from "../../Image/Logo.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/action/LoginAction";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useSelector((state) => state.setToggle);
  let NewValue = value.id;

  useEffect(() => {
    console.log(NewValue, "NewValue");
    NewValue ? setIsOpen(true) : setIsOpen(false);
  }, [NewValue]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(logout());
    navigate("/Login");
  };

  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <HomeOutlinedIcon style={{ fontSize: 35 }} />,
    },
    {
      path: "/Product",
      name: "Products",
      icon: <Inventory2OutlinedIcon style={{ fontSize: 35 }} />,
    },
    {
      path: "/Marketing",
      name: "Marketing",
      icon: <CampaignOutlinedIcon style={{ fontSize: 35 }} />,
    },
    {
      path: "/Settings",
      name: "Settings",
      icon: <SettingsOutlinedIcon style={{ fontSize: 35 }} />,
    },
  ];
  return (
    <div className="Sidebar" style={{ width: isOpen ? "200px" : "70px" }}>
      <div className="logo1" style={{ marginLeft: isOpen ? "15px" : "10px" }}>
        <img src={Logo} alt="Logo" />
        <div
          className="MicrodemandSideBar"
          style={{ display: isOpen ? "block" : "none" ,marginTop:"5px",fontSize:"21px"}}
        >
          <span>MICRO</span>
          <br />
          <span>
            <b>DEMAND</b>
          </span>
        </div>
      </div>
      <div className="menu">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active1"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className="menuItem1">
          <div className="LogOut_Button">
            <button
              style={{
                border: "none",
                cursor: "pointer",
                background:"white"
              }}
              onClick={() => LogoutHandler()}
            >
              <LogoutOutlinedIcon
                sx={{                  
                  color: "red",
                  mt: "3px",
                  ml: 2,
                  fontSize: 30,
                  rotate: "180deg",                  
                }}
              />
            </button>
            <div
              style={{
                display: isOpen ? "block" : "none",
                color: "red",              
              }}
              className="link_text1"
            >
              LogOut
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
