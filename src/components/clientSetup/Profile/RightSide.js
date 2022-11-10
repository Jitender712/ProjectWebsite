import {
  HorizontalRuleOutlined,
  NotificationAddOutlined,
  Search,
} from "@mui/icons-material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import "./RightSide.css";
import user from "../../Image/userDummy.svg";
import King from "../../Image/King.png";
import upgrade from "../../Image/Upgrade_to_Pro.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Subscription from "./Subscription/Subscription"
import PopUpSubscription from "../../Control/PopUpSubscription"
import { RemindersData } from "../../Data/Data";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [openPopupSubs, setOpenPopupSubs] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // console.log("name",userInfo.data.user.name);

  return (
    <div className="Right_side">
      <div className="Search_box">
        <Search sx={{ color: "#354052" }} />
        <HorizontalRuleOutlined sx={{ rotate: "90deg", color: "#BBC5D5" }} />
        <Input placeholder="Search Keyword" sx={{ display: "contents" }} />
        <div className="Notification">
          <NotificationAddOutlined />
        </div>
      </div>
      <div className="Profile">
        <span
          style={{
            fontWeight: 400,
            fontSize: 18,
            color: "#11141A",
          }}
        >
          Hello,
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: "#11141A",
          }}
        >
      
          {userInfo ? (
            <div className="username" style={{ cursor: "pointer", }}>
              {userInfo.data.name}
            </div>
          ) : (
            <Link
              style={{ textDecoration: "none",  }}
              to="/Login"
            >
              Sign In
            </Link>
          )}
        
        </span>

        <img
          src={user}
          alt="user"
          style={{
            position: "absolute",
            width: 85,
            height: 118.42,
            marginLeft: 200,
          }}
        />

        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 5,
            color: " #7F8FA4",
            position: "relative",
          }}
        >
          Copy your bio link and paste it in your profile to let{" "}
        </span>
      </div>{" "}
      <div className="LinkContainer">
        <div className="LinkProfile">
          <Input
            placeholder="Microdemand.com/jonath"
            sx={{ display: "contents", fontSize: 12 }}
          />
          <HorizontalRuleOutlined sx={{ rotate: "90deg", color: "#BBC5D5" }} />
          <ContentCopyIcon />
        </div>
        <img src={King} alt="logo" />
      </div>
      <div className="Upgrade_To_Pro">
        {/* <div className="upgradeDiv">
          <span
            style={{
              fontWeight: 400,
              color: "white",
              fontSize: 19,
              lineHeight: 2,
            }}
            >
            UPGRADE TO PRO
            </span>
            <br />
            <span
            style={{
              fontWeight: 400,
              color: "white",
              fontSize: 12,
              lineHeight: 5,
            }}
            >
            For more Profile Control
            </span> 
            </div>
            <div className="upgrade_Logo">
            <img src={upgrade} alt="logo" />
            </div>
          */}
      <img src={upgrade} alt="logo"
      style={{
        height: "155px",
      }}
      onClick={() => setOpenPopupSubs(true)}
      />
      </div>
      <div className="Reminders">
        <div className="Reminder_Heading">
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 2,
              marginRight: 60,
              color: "#11141A",
            }}
          >
            Reminder
          </span>
          <span
            style={{
              fontFamily: "emoji",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: 15,
              marginLeft: 50,
              marginRight: -5,
              color: "#0088FF",
            }}
          >
            View All
          </span>
          <ChevronRightIcon />
        </div>
        {RemindersData.map((item, id) => {
          return (
            <div className="Reminder" key={id}>
              <div className="Icon">
                <item.icon
                  sx={{
                    color: "red",
                    fontSize: 30,
                  }}
                />
              </div>
              <div className="ReminderMsg">
                <span>{item.name}</span>
                <br />
                <span
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: 12,
                  }}
                >
                  {item.msg}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <PopUpSubscription
        title="Payments"
        openPopupSubs={openPopupSubs}
        setOpenPopupSubs={setOpenPopupSubs}
      >
        <Subscription />
      </PopUpSubscription>
    </div>
  );
};

export default RightSide;
