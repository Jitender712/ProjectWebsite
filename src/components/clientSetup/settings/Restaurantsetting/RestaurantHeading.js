import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./RestaurantHeading.css";
import { Link } from "@mui/material";
import RestaurantSetting from "./RestaurantSetting";
import Menu from "../../menu/Menu";

function RestaurantHeading() {
  return (
    <div className="Restaurant_Container">
      <div className="Restaurant_Heading">
        <div className="Setting_Restaurant">
          <div className="Setting_Settings">
            <Menu />
            <h1>Settings</h1>
          </div>
          <div className="Heading12">
            <div className="Customer_List">
              <Link href="Settings" underline="hover" sx={{ color: "#0088FF",ml:5 }}>
                <span>Settings</span>
              </Link>
              <ArrowForwardIosIcon sx={{ Color: "grey", fontSize: 12 }} />
              <span>Store</span>
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
      <RestaurantSetting />
    </div>
  );
}

export default RestaurantHeading;
