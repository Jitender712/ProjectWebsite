import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./AdBanner.css";

const AdBanner = () => {
  const [product, setProduct] = useState("");

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  return (
    <div className="AdBannerContainer_Box">
      <Box>
        <div>
          <div className="AdBannerContainer">
            <div className="AdBannerHeading">Name</div>
            <div className="AdTextField">
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                placeholder="Enter Name"
              />
            </div>
          </div>

          <div className="AdBannerContainer">
            {" "}
            <div className="AdBannerHeading">External Link</div>
            <div className="AdTextField">
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                placeholder="https://www.example.com"
              />
            </div>
            <span style={{ fontSize: 14, marginLeft: "10px", color: "grey" }}>
              Link the banner to an external link. when the customer will click
              on this banner,he/she will be redirected to this link
            </span>
          </div>
          <div className="AdBannerContainer">
            {" "}
            <div className="AdBannerHeading">Description</div>
            <div className="AdTextField">
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                placeholder="Enter Description"
              />
            </div>
            <span style={{ fontSize: 14, marginLeft: "10px", color: "grey" }}>
              You can enter here your own description/note about the banner for
              your use.
            </span>
          </div>
        </div>
        <div className="AdBannerContainer">
          {" "}
          <div className="AdBannerHeading">Select Product</div>
          <div className="AdTextField">
            <FormControl sx={{ m: 1, width: "-webkit-fill-available" }}>
              <Select value={product} onChange={handleChange} displayEmpty>
                <MenuItem value="">
                  <em>Select Product</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="AdBannerContainer">
          <span style={{ marginLeft: "10px" }}>
            Banner Image For Web (1920X360 Px)
          </span>
          <div className="AdBannerLogo">
            <div className="AdImage"></div>
            <div className="texting">
              Drag & Drop Image, Or <span>browse </span>from computer
            </div>
          </div>
        </div>
        <div className="AdBannerContainer">
          <span style={{ marginLeft: "10px" }}>
            Banner Image For Mobile Web (1920X360 Px)
          </span>
          <div className="AdBannerLogo">
            <div className="AdImage"></div>
            <div className="texting">
              Drag & Drop Image, Or <span>browse </span>from computer
            </div>
          </div>
        </div>
        <div className="AdBannerContainer">
          <span style={{ marginLeft: "10px" }}>
            Banner Image For Native Mobile Apps (1920X480 Px)* / (768X384 Px)
          </span>
          <div className="AdBannerLogo">
            <div className="AdImage"></div>
            <div className="texting">
              Drag & Drop Image, Or <span>browse </span>from computer
            </div>
          </div>
        </div>
      </Box>
      <div className="AdButtons">
        <Button
          variant="contained"
          sx={{ borderRadius: 2, background: "grey" }}
        >
          Cancel
        </Button>
        <Button variant="contained" sx={{ borderRadius: 2 }}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AdBanner;
