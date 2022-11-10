import React, { useState } from "react";
import "./Product.css";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select } from "@mui/material";
import Card from "./Card/Card";
import Menu from "../../menu/Menu";
// import Cards from './cards/Cards';
const Product = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="Product_Container_div">
      <div className="HeadingP">
      <div className="Setting_MainDash">
      <Menu/>
      <h1>Product</h1>
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
      <div className="FilterBar">
        <div className="Option">
          <FormControl sx={{ mt: 3, minWidth: 150 }}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ height: 35, borderRadius: 2 }}
            >
              <MenuItem value="">
                <span
                  style={{
                    fontFamily: "Inter",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "17px",
                    color: " #8F959E",
                  }}
                >
                  Show Items
                </span>
              </MenuItem>
              <MenuItem
                value={10}
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: " #8F959E",
                }}
              ></MenuItem>
              <MenuItem
                value={20}
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: " #8F959E",
                }}
              ></MenuItem>
              <MenuItem
                value={30}
                style={{
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: " #8F959E",
                }}
              ></MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="Import_Export">
          <Button
            style={{
              backgroundColor: "#0088FF",
              color: "white",
                fontWeight: 300,
              fontSize: "14px",
            }}
          >
            Import/Export
          </Button>
        </div>
        <div className="Import_Export">
          <Button
            style={{
              backgroundColor: "#8F959E",
              fontFamily: "Inter",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "14px",
              color: "white",
            }}
          >
            Clear All
          </Button>
        </div>
      </div>
      <Card/>
    </div>
  );
};
export default Product;
