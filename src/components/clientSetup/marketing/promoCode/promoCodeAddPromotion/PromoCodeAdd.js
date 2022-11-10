import React, { useState } from "react";
import "./PromoCodeAdd.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PercentageDiscount from "./percentageDiscount/PercentageDiscount";
import FlatDiscount from "./flatDiscount/FlatDiscount";

const PromoCodeAdd = () => {
  const [select, setSelect] = useState("Percentage Discount");
  // const value = select;
  const onchange = (e) => {
      setSelect(e.target.value);
  };
  

  return (
    <div className="Ad">
      <Box
        sx={{
          width: 900,
          m: 2,
          display: "flex",
        }}
      >
        <div
          className="Wrapper_Promotion"
          style={{
            width: " -webkit-fill-available",
          }}
        >
          <FormControl>
            <span>Promotion Type*</span>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Percentage Discount"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="Percentage Discount"
                control={<Radio />}
                label="Percentage Discount"
                onChange={onchange}
              />
              <FormControlLabel
                value="Flat Discount"
                control={<Radio />}
                label="Flat Discount"
                onChange={onchange}
              />
            </RadioGroup>
          </FormControl>
          {console.log("Value", select)}
          {select === "Percentage Discount" ? (
            <PercentageDiscount />
          ) : (
            <FlatDiscount />
          )}
        </div>
      </Box>
    </div>
  );
};

export default PromoCodeAdd;
