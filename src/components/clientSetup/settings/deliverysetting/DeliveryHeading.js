import React from 'react'
import "./DeliveryHeading.css"
import { Button, Link } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeliveryPage from './DeliveryPage';
import Menu from '../../menu/Menu';


const DeliveryHeading = () => {
  return (
    <div className="Delivery_Container">
    <div className="Delivery_Heading">
      <div className="Setting_Delivery">
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
            <span>Delivery</span>
          </div>
        </div>
      </div>
      <div className="LastDivDelivery">
        <div className="ButtonDelivery">
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
    <DeliveryPage/>
  </div>
  )
}

export default DeliveryHeading
