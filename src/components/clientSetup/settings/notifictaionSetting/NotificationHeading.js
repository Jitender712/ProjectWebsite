import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./NotificationHeading.css";
import { Link } from "@mui/material";
import NotificationSetting from "./NotificationSetting";
import Menu from "../../menu/Menu";

function NotificationHeading() {
  return (
    <div className="Notification_ContainerS">
      <div className="Notification_Heading">
        <div className="Setting_Notification">
          <div className="Setting_Settings">
            <Menu />
            <h1>Settings</h1>
          </div>
          <div className="Heading12">
            <div className="Customer_List" style={{marginLeft : "-40px"}}>
              <Link
                href="/Settings"
                underline="hover"
                sx={{ cursor: "pointer",ml:5 }}
              >
                {"Settings"}
              </Link>
              <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
              <Link underline="hover" sx={{ cursor: "pointer" }}>
                {"Notification"}
              </Link>
              <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
              <span>Notification Settings</span>
            </div>
          </div>
        </div>
        <div className="LastDiv">
          <div className="Button">
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
      <NotificationSetting />
    </div>
  );
}

export default NotificationHeading;
