import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import "./PromoCodeHeading.css";
import PromoCode from "./PromoCode";
import { Link } from "react-router-dom";
import Menu from "../../menu/Menu";

const PromoCodeHeading = () => {
  return (
    <div className="CustomersContainer">
      <div className="PromoCode_Heading">
        <div className="Setting_PromoCode">
          <div className="Setting_Marketing">
            <Menu />
            <h1>Marketing</h1>
          </div>
          <div className="Heading12">
            <div className="Customer_List">
              <Link
                to="/Marketing"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#0088FF",
                }}
              >
                {"Marketing"}
              </Link>
              <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
              <span>Promo Code</span>
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
      <PromoCode />
    </div>
  );
};

export default PromoCodeHeading;
