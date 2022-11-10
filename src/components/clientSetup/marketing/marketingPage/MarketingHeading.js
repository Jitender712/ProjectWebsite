import React from 'react'
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import "./MarketingHeading.css";
import MarketingCard from './MarketingCard';
import Menu from '../../menu/Menu';

const MarketingHeading = () => {
  return (
    <div className="CustomersContainer">
    <div className="Marketing_Heading">
      <div className="Setting_Marketing">
      <Menu/>
      <h1>Marketing</h1>
      
      </div>
      <div className="LastDiv">
        <div className="Button">
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
        
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
    <MarketingCard/>
  </div>
  )
}

export default MarketingHeading



