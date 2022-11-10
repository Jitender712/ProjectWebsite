import { Button } from "@mui/material";
import React from "react";
import "./SettingHeading.css";
import SettingCard from "./SettingCard";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Menu from "../../menu/Menu";

const SettingHeading = () => {
  return (
    <div className="Settings_Container">
    <div className="Settings_Heading">
      <div className="Setting_Settings">
      <Menu/>
      <h1>Settings</h1>
      </div>
      <div className="LastDivSettings">
        <div className="ButtonSettings">
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
          {/* <Button>
        View Website<LanguageOutlinedIcon/>
      </Button> */}
        </div>
        <div className="Message">
          <ChatOutlinedIcon />
        </div>
      </div>
    </div>
    <SettingCard/>
  </div>
  );
};

export default SettingHeading;
