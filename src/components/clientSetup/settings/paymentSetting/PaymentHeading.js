import React from 'react'
import "./PaymentHeading.css"
import { Button, Link } from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Payment from './Payment';
import Menu from '../../menu/Menu';

const PaymentHeading = () => {
  return (
    <div className="Payment_Container">
    <div className="Payment_Heading">
      <div className="Setting_Payment">
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
            <span>Payment</span>
          </div>
        </div>
      </div>
      <div className="LastDivPayment">
        <div className="ButtonPayment">
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
    <Payment/>
  </div>
  )
}

export default PaymentHeading
