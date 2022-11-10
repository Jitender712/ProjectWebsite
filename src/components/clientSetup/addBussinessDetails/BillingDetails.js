import { Box, Button, Grid, Paper } from "@mui/material";
import React from "react";
// import Header from "../Header";
import "./BillingDetails.css";
import Busniess from "../../Image/Busniess.svg";
import billing_icon from "../../Image/billing_icon.svg";
import Radio from "@mui/material/Radio";
// import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import HeaderForOnboarding from "../../onBoarding/HeaderForOnboarding";
import RadioGroup from "@mui/material/RadioGroup";
import { Link } from "react-router-dom";
const BillingDetails = () => {
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
                <div className="Choose_Border5">.</div>
              </div>
              <div className="Complete4">80% Complete</div>
              <Grid
                align="center"
                sx={{ mt: 0, fontSize: 22, fontWeight: 600 }}
              >
                Billing Detail
              </Grid>
              <div className="Billing_Detail">
                <RadioGroup
          defaultValue="Pay As You Go"
          name="radio-buttons-group"
        >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      width: 400,
                      height: 60,
                      borderRadius: 3,
                      p: 2,
                      mt: 3,
                    },
                  }}
                >
                  <Paper elevation={3}>
                    <div className="BILLING_DETAIL">
                      <div className="UMBRELLA_PAY">
                        <div className="Umbrella_logo">
                          <img src={billing_icon} alt="" style={{}} />
                        </div>
                        <div className="Pay_AS_YOU_GO">
                          <div className="Pay">Pay As You Go</div>
                          <div className="CASH">
                            ₹2.00<span>(Pay As You Go)</span>
                          </div>
                        </div>
                      </div>
                      <div className="RADIO_BUTTON">
                        <FormControlLabel value="Pay As You Go" control={<Radio />} sx={{ mt: 1 }} />
                      </div>
                    </div>
                  </Paper>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      width: 400,
                      height: 60,
                      borderRadius: 3,
                      p: 2,
                      mt: 3,
                    },
                  }}
                >
                  <Paper elevation={3}>
                    <div className="BILLING_DETAIL">
                      <div className="UMBRELLA_PAY">
                        <div className="Umbrella_logo">
                          <img src={billing_icon} alt="" style={{}} />
                        </div>
                        <div className="Pay_AS_YOU_GO">
                          <div className="Pay">Store Monthly</div>
                          <div className="CASH1">
                            ₹2000.00
                            <span>
                              /mo<span>(Billed Monthly)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="RADIO_BUTTON">
                        <FormControlLabel value="Store Monthly"control={<Radio />} sx={{ mt: 1 }} />
                      </div>
                    </div>
                  </Paper>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                      width: 400,
                      height: 60,
                      borderRadius: 3,
                      p: 2,
                      mt: 3,
                    },
                  }}
                >
                  <Paper elevation={3}>
                    <div className="BILLING_DETAIL">
                      <div className="UMBRELLA_PAY">
                        <div className="Umbrella_logo">
                          <img src={billing_icon} alt="" style={{}} />
                        </div>
                        <div className="Pay_AS_YOU_GO">
                          <div className="Pay">Pay As You Go</div>
                          <div className="CASH2">
                            ₹1800.00
                            <span>
                              /mo<span>(Billed Semi Annually)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="RADIO_BUTTON">
                        <FormControlLabel value="Billed Semi Annually" control={<Radio />} sx={{ mt: 1 }} />
                      </div>
                    </div>
                  </Paper>
                </Box>
                </RadioGroup>
              </div>

              <Link to="/Login">
                <Button
                  variant="contained"
                  sx={{
                    width: "-webkit-fill-available",
                    ml: 11,
                    mt: 0,
                    mr: 12,
                  }}
                >
                  Next
                </Button>
              </Link>
              <Link to="/Login">
                <Button
                  variant="outlined"
                  sx={{
                    width: "-webkit-fill-available",
                    ml: 11,
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

export default BillingDetails;
