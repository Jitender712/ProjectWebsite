import { Box, Button, Paper } from "@mui/material";
import React from "react";
import "./Subscription.css";
import DoneIcon from "@mui/icons-material/Done";
import PaymentLogo from "../../../Image/Umbrella.png";

const Subscription = () => {
  return (
    <div>
      <Box
        sx={{
          // bgcolor: "#cfe8fc",
          height: 400,
          width: 1050,
          m: 2,
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            m: 2,
            width: 230,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="Subscription_ImgContainer">
            <img
              src={PaymentLogo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "58px",
              gap: 1,
            }}
          >
            <span
              style={{
                fontSize: "15px",
              }}
            >
              Pay As You Go
            </span>
            <br />
            <span
              style={{
                lineHeight: 2,
                margin: "20px",
                fontSize: "20px",
              }}
            >
              <b>₹2.00</b>
            </span>
            <br />
            <span
              style={{
                color: "#0088FF",
                fontSize: "12px",
              }}
            >
              (Pay As You Go)
            </span>
            <br />
          </div>
          <div className="Subscription_Details">
            <div className="Subs_details">
              <DoneIcon /> <span>Branded Web Platform</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>100 Orders/Month (Additional Orders At ₹3 Per Order).</span>
              <br />
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Unlimited Users & Listings</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>100+ Integrations</span>
            </div>
          </div>
          <div className="Button5">
            <Button variant="contained">Choose Plan</Button>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ m: 2, width: 230 }}>
          <div className="Subscription_ImgContainer">
            <img
              src={PaymentLogo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "58px",
              gap: 1,
            }}
          >
            <span
              style={{
                fontSize: "15px",
              }}
            >
              Store Monthly
            </span>
            <br />
            <span
              style={{
                lineHeight: 2,
               
                fontSize: "20px",
              }}
            >
              <b>₹2000.00</b>
            </span>
            <br />
            <span
              style={{
                color: "#0088FF",
                fontSize: "12px",
              }}
            >
              (Billed Monthly)
            </span>
            <br />
          </div>
          <div className="Subscription_Details">
            <div className="Subs_details">
              <DoneIcon /> <span>Non-Branded Web Platform</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Free 50 Orders (Additional Orders At ₹3 Per Order).</span>
              <br />
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Unlimited Users & Listings</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>100+ Integrations</span>
            </div>
          </div>
          <div className="Button5">
            <Button variant="contained">Choose Plan</Button>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ m: 2, width: 230 }}>
          <div className="Subscription_ImgContainer">
            <img
              src={PaymentLogo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "58px",
              gap: 1,
            }}
          >
            <span
              style={{
                fontSize: "15px",
                marginLeft: "-12px",
              }}
            >
              Store Semi Annual
            </span>
            <br />
            <span
              style={{
                lineHeight: 2,
         
                fontSize: "20px",
              }}
            >
              <b>₹1800.00</b>
            </span>
            <br />
            <span
              style={{
                color: "#0088FF",
                fontSize: "12px",
              }}
            >
              (Billed Semi Annually)
            </span>
            <br />
          </div>
          <div className="Subscription_Details">
            <div className="Subs_details">
              <DoneIcon /> <span>Non-Branded Web Platform</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Free 50 Orders (Additional Orders At ₹3 Per Order).</span>
              <br />
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Unlimited Users & Listings</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>100+ Integrations</span>
            </div>
          </div>
          <div className="Button5">
            <Button variant="contained">Choose Plan</Button>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ m: 2, width: 230 }}>
          <div className="Subscription_ImgContainer">
            <img
              src={PaymentLogo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div
            style={{
              marginLeft: "58px",
              gap: 1,
            }}
          >
            <span
              style={{
                fontSize: "15px",
              }}
            >
              Store Annual
            </span>
            <br />
            <span
              style={{
                lineHeight: 2,
            
                fontSize: "20px",
              }}
            >
              <b>₹1800.00</b>
            </span>
            <br />
            <span
              style={{
                color: "#0088FF",
                fontSize: "12px",
              }}
            >
              (Billed Annually)
            </span>
            <br />
          </div>
          <div className="Subscription_Details">
            <div className="Subs_details">
              <DoneIcon /> <span>Non-Branded Web Platform</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Free 50 Orders (Additional Orders At ₹3 Per Order).</span>
              <br />
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>Unlimited Users & Listings</span>
            </div>
            <div className="Subs_details">
              <DoneIcon />
              <span>100+ Integrations</span>
            </div>
          </div>
          <div className="Button5">
            <Button variant="contained">Choose Plan</Button>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Subscription;
