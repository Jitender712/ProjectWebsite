import React from "react";
import "./OrderHeading.css"
import { Button, Link } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Order from "./Order";
import Menu from "../../menu/Menu";

const OrderHeading = () => {
  return (
    <div className="OrderPage_Container">
    <div className="OrderPage_Heading">
      <div className="Setting_OrderPage">
     <div className="Setting_Settings">
      <Menu/>
      <h1>Settings</h1>
      </div>
      <div className="Heading123">
          <div className="Customer_List">
            <Link href="Settings" underline="hover" sx={{color : "#0088FF",ml:5}}> 
            <span>Settings</span>
            </Link>
            <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
            <Link href="Settings" underline="hover" sx={{color : "#0088FF"}}> 
            <span>Order Settings</span>
            </Link>
            <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
            <span>Order</span>
          </div>
        </div>
      </div>
      <div className="LastDivOrderPage">
        <div className="ButtonOrderPage">
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
          {/* <Button>
        View Website<LanguageOutlinedIcon/>
      </Button> */}
        </div>
        <div className="Message">
          <ChatOutlinedIcon />
        </div>
      </div>
    </div>
    <Order/>
  </div>
  );
};

export default OrderHeading;
