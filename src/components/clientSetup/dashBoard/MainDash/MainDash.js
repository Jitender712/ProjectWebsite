import React from "react";
import "./MainDash.css";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Button } from "@mui/material";
import Cards from "../Cards/Cards";
import Menu from "../../menu/Menu";

const MainDash = () => {
  return (

    <div className="MainDash_Container">
    <div className="MainDash_Heading">
      <div className="Setting_MainDash">
      <Menu/>
      <h1>DashBoard</h1>
      </div>
      <div className="LastDivMaindash">
        <div className="ButtonMainDash">
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
    <Cards/>
  </div>
  );
};

export default MainDash;
