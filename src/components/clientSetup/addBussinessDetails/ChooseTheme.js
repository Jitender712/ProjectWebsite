import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
// import Header from "../Header";
import "./ChooseTheme.css";
import Busniess from "../../Image/Busniess.svg";
import Radio from "@mui/material/Radio";
import light from "../../Image/light.svg";
import FormControlLabel from "@mui/material/FormControlLabel";
import dark from "../../Image/dark.svg";
import black from "../../Image/black.svg";
import auto from "../../Image/auto.svg";
import HeaderForOnboarding from "../../onBoarding/HeaderForOnboarding";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client_URL } from "../../Constants/Constant";
import RadioGroup from "@mui/material/RadioGroup";
const ChooseTheme = () => {
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
          ChooseTheme: "Light",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log("Choosetheme", result);
    if (result.statusCode === 200) {
      navigate("/SetupDomain");
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
            // width: 1010,
            // height: 580,
            borderRadius: 3,
            p: 0,
            mt: 10,
          },
        }}
      >
        <Paper elevation={3} sx={{ ml: 40, mr: 25 }}>
          <div className="Business_Detail">
            <div className="Businessdetail_Pic">
              <div className="Image">
                <img src={Busniess} alt=""></img>
              </div>
              <div className="Image_text">
                Aenan blandit est eget dapibus sagitus.
              </div>
              <div className="Image_text2">
                Mauris imperidict arcu vitae mi sollicitudin,quis porttiitor
                lacus elementum.
              </div>
            </div>
            <div className="Business_Detail3">
              <div className="Border1">
                <div className="Choose_Border">.</div>
              </div>
              <div className="Complete3">40% Complete</div>
              <Grid
                align="center"
                sx={{ mt: 0, fontSize: 22, fontWeight: 600 }}
              >
                Choose Theme
              </Grid>
              <div className="Choose_Theme">
              <RadioGroup
                  defaultValue="light"
                  name="radio-buttons-group"
                >
                <div className="light">
                  <img src={light} alt=""></img>

                  <FormControlLabel
                  value="light"
                    control={<Radio />}
                    sx={{ position: "absolute", ml: 33, mt: 0 }}
                  />
                </div>
                <div className="Light" style={{ fontWeight: 500, mt: 1 }}>
                  Light
                </div>

                <div className="Dark">
                  <img src={dark} alt=""></img>
                  <FormControlLabel value="dark"
                    control={<Radio sx={{ color: "white" }} />}
                    sx={{ position: "absolute", ml: 33, mt: 0 }}
                  />
                </div>
                <div className="Dark1" style={{ fontWeight: 500, mt: 1 }}>
                  Dark
                </div>

                <div className="Black">
                  <img src={black} alt=""></img>
                  <FormControlLabel  value="black"
                    control={<Radio sx={{ color: "white" }} />}
                    sx={{ position: "absolute", ml: 33, mt: 0 }}
                  />
                </div>
                <div className="Black1" style={{ fontWeight: 500, mt: 1 }}>
                  Black
                </div>

                <div className="Auto">
                  <img src={auto} alt=""></img>
                  <FormControlLabel value="auto"
                    control={<Radio />}
                    sx={{ position: "absolute", ml: 33, mt: 0 }}
                  />
                </div>
                <div className="Auto1" style={{ fontWeight: 500, mt: 1 }}>
                  Auto
                </div>

                </RadioGroup>
              </div>
              <div className="MessageError">{message}</div>
              {/* <Link to="/SetupDomain"> */}
              <Button
                variant="contained"
                sx={{ width: "-webkit-fill-available", ml: 7.5, mt: 0, mr: 12 }}
                onClick={collectData}
              >
                Next
              </Button>
              {/* </Link> */}
              <Link to="/SetupDomain">
                <Button
                  variant="outlined"
                  sx={{
                    width: "-webkit-fill-available",
                    ml: 7.5,
                    mt: 1,
                    mr: 12,
                  }}
                >
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

export default ChooseTheme;
