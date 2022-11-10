import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
// import Header from "../../Header";
import "./BusinessDetails.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import StoreIcon from "@mui/icons-material/Store";
import Business from "../../Image/Busniess.svg";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import HeaderForOnboarding from "../../onBoarding/HeaderForOnboarding";
import { Link, useNavigate } from "react-router-dom";
import { Client_URL } from "../../Constants/Constant";
import { useSelector } from "react-redux";
const BusinessDetails = () => {
  const [storeName, setStoreName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const ClientId = useSelector((state) => state.setClientId);
  const Client_id = ClientId.id;
  const collectData = async () => {
    console.log("ClientId", Client_id);
    let result = await fetch(
      `${Client_URL}/v1/client/addBusinessDetails?clientId=${Client_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          businessType: "store",
          name: storeName
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log("Bussines", result);
    if (result.statusCode === 200) {
      navigate("/ChooseTheme");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Grid>
      <HeaderForOnboarding />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            ml: 50,
            width: 1010,
            height: 580,
            borderRadius: 3,
            p: 0,
            mt: 10,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Business_Detail">
            <div className="Businessdetail_Pic">
              <div className="Image">
                <img src={Business} alt=""></img>
              </div>
              <div className="Image_text">
                Aenan blandit est eget dapibus sagitus.
              </div>
              <div className="Image_text2">
                Mauris imperidict arcu vitae mi sollicitudin,quis porttiitor
                lacus elementum.
              </div>
            </div>
            <div className="Business_Detail1">
              <div className="Border1">
                <div className="Border2">.</div>
              </div>
              <div className="Complete">10% Complete</div>
              <Grid
                align="center"
                sx={{ mt: 3, fontSize: 22, fontWeight: 600 }}
              >
                Business Detail
              </Grid>
              <div className="Business_Details">
                <RadioGroup
                  defaultValue="Single Store Front"
                  name="radio-buttons-group"
                >
                  <div className="Shop_Name">Shop/Business Name</div>
                  <TextField
                    id="outlined-basic"
                    placeholder="Enter Shop/Business Name"
                    required
                    variant="outlined"
                    sx={{ width: 385, mt: 2, border: " 0px solid grey" }}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                  <div className="Store">
                    <StoreIcon
                      sx={{ mt: 2, ml: 3, fontSize: 28, color: "blue" }}
                    />
                    <div className="Store1">
                      Store
                      <div className="Single_Store" style={{ color: "grey" }}>
                        Single Store Front
                      </div>
                    </div>
                    <FormControlLabel
                      value="Single Store Front"
                      control={<Radio />}
                      sx={{ ml: 15 }}
                    />
                  </div>

                  <div className="Store">
                    <WorkspacesOutlinedIcon
                      sx={{ mt: 2, ml: 3, fontSize: 28, color: "blue" }}
                    />
                    <div className="Store2">
                      Brand
                      <div className="Single_Store" style={{ color: "grey" }}>
                        D2C-single Brand Multi Store
                      </div>
                    </div>
                    <FormControlLabel
                      value="D2C-single Brand Multi Store"
                      control={<Radio />}
                      sx={{ ml: 4 }}
                    />
                  </div>
                  <div className="Store">
                    <StorefrontOutlinedIcon
                      sx={{ mt: 2, ml: 3, fontSize: 28, color: "blue" }}
                    />
                    <div className="Store2">
                      Marketplace
                      <div className="Single_Store" style={{ color: "grey" }}>
                        Multiple Merchant
                      </div>
                    </div>
                    <FormControlLabel
                      value=" Multiple Merchant"
                      control={<Radio />}
                      sx={{ ml: 4 }}
                    />
                  </div>
                </RadioGroup>
              </div>
              <div className="MessageError">{message}</div>
              {/* <Link to="/ChooseTheme"> */}
              <Button
                variant="contained"
                sx={{ width: 380, ml: 8, mt: 1 }}
                onClick={collectData}
              >
                Next
              </Button>
              {/* </Link> */}
              <Link to="/ChooseTheme">
                <Button variant="outlined" sx={{ width: 380, ml: 8, mt: 1 }}>
                  Skip
                </Button>
              </Link>
            </div>
          </div>
        </Paper>
      </Box>
    </Grid>
  );
};

export default BusinessDetails;
