import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./AddBannerHeading.css";
import { Link } from "@mui/material";
import AddBanner from "./AddBanner";
import Menu from "../../menu/Menu";


const AddBannerHeading = () => {
  return (
    <div className="CustomersContainer">
      <div className="AddBanner_Heading">
        <div className="Setting_AddBanner">
       <div style={{display: "flex"}}>

        <Menu/>
        <h1>Marketing</h1>
       </div>
        <div className="Heading12">
          <div className="Customer_List">
            <Link href="/Marketing" underline="hover" sx={{ cursor: "pointer" }}>
              {"Marketing"}
            </Link>
            <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
            <span>Ad Banners </span>
          </div>
        </div>
        </div>
        <div className="LastDiv">
          <div className="Button">
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                // width: "200px",
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
      <AddBanner/>
    </div>
  )
}

export default AddBannerHeading
