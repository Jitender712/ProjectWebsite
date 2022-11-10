import React from "react";
import "./CustomerHeading.css";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Button, Link } from "@mui/material";
import CustomerData from "./CustomerData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Menu from "../../menu/Menu";

const CustomerHeading = () => {
  return (
    <div className="CustomerList_Container">
    <div className="CustomerList_Heading">
      <div className="Setting_CustomerList">
      <div className="Setting_Settings">
      <Menu/>
      <h1>Settings</h1>
      </div>
      <div className="Heading12">
          <div className="Customer_List">
            <Link href="Settings" underline="hover" sx={{color : "#0088FF",ml:5}}> 
            <span>Settings</span>
            </Link>
            <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
            <span>Customer List</span>
          </div>
        </div>
      </div>
      <div className="LastDivCustomerList">
        <div className="ButtonCustomerList">
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
            // width: "200px"
              justifyContent: "space-evenly",
              backgroundColor: "#0088FF",
            }}
          >
            View Website
            <LanguageOutlinedIcon />
          </Button>
        </div>
        <div className="Message">
          <ChatOutlinedIcon />
        </div>
      </div>
    </div>
    <CustomerData/>
  </div>
  );
};

export default CustomerHeading;
