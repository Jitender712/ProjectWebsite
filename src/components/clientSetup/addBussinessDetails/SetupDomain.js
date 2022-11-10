import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
// import Header from "../Header";
import "./SetupDomain.css";
import Busniess from "../../Image/step.svg";
import checkgreen from "../../Image/checkgreen.svg";
import HeaderForOnboarding from "../../onBoarding/HeaderForOnboarding";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client_URL } from "../../Constants/Constant";
const SetupDomain = () => {
  const [message, setMessage] = useState("");
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const ClientId = useSelector((state) => state.setClientId);
  const Client_id = ClientId.id;
  const collectData = async () => {
    console.log("ClientId", Client_id,"Domain",domain);
    let domainname = domain+".ondemand"
    console.log("domain", domainname);
    let result = await fetch(
      `${Client_URL}/v1/client/setupDomain?clientId=${Client_id}`,
      {
        method: "POST",
        body: JSON.stringify({
          setupDomain : domainname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log("Choosetheme", result);
    if (result.statusCode === 200) {
      navigate("/BillingDetails");
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
                <div className="Choose_Border4">.</div>
              </div>
              <div className="Complete4">60% Complete</div>
              <Grid
                align="center"
                sx={{ mt: 15, fontSize: 24, fontWeight: 600 }}
              >
                Setup Domain
              </Grid>
              <div className="Setup_Domain">
                <div className="Setup_text">
                  <input
                    type="text"
                    placeholder="Black Paris"
                    style={{
                      width: " -webkit-fill-available",
                      height: 45,
                      fontSize: 16,
                      borderRadius: 7,
                      border: "0px solid 	#DCDCDC",
                    }}
                    onChange={(e) => setDomain(e.target.value)}
                  ></input>
                  <div className="On_Demand">
                    <div className="On_demand">.ondemand</div>
                    <img
                      src={checkgreen}
                      alt=""
                      style={{
                        marginTop: 12,
                        marginLeft: 8,
                        fontSize: 12,
                        width: "-webkit-fill-available",
                      }}
                    ></img>
                  </div>
                  {/* <div className='Setup_text'><input type="text" placeholder="Black Paris" style={{width:}}></input></div> */}
                </div>
              </div>
              <div className="MessageError">{message}</div>
              <Button
                variant="contained"
                sx={{ width: "-webkit-fill-available", ml: 7.5, mt: 1, mr: 12 }}
                onClick={collectData}
              >
                Next
              </Button>
              <Link to="/BillingDetails">
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

export default SetupDomain;
