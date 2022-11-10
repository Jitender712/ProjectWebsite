import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Client_URL } from "../../Constants/Constant";
import HeaderForOnboarding from "../HeaderForOnboarding";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const EmailId = useSelector((state) => state.setEmailId);
  const email =EmailId.id;

  const collectData = async () => {
    console.log("Running");
    let type = 2;
    console.log("OTP", otp, "Email", email);
    let result = await fetch(`${Client_URL}/v1/client/verifyOtp`, {
      method: "PUT",
      body: JSON.stringify({ email, otp, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result", result);
    if (result.statusCode === 200) {
      navigate("/ResetPassword");
    } else {
      setMessage(result.message);
    }
  };
  const resendOTP = async () => {
    console.log("Email", email);
    let result = await fetch(`${Client_URL}/v1/client/resendOtp`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result", result);
    if (result.statusCode === 200) {
      navigate("/ResendOtpFP");
    } else {
      setMessage(result.message);
    }
  };
  const handleChange = (otp) => setOtp(otp);

  return (
    <Grid>
      <HeaderForOnboarding />
      <Container component="main" sx={{ width: 430 }}>
        <Grid align="center">
          <h1>Verify OTP</h1>
          <div className="Verify_OTP">
            <span>
              Enter 4 digit code sent to you at <span>{email}</span>
            </span>
          </div>
          <div className="OTP">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              separator={<span>-</span>}
              inputStyle={{
                margin: "50px 15px",
                border: "1px solid transparent",
                borderRadius: "8px",
                width: "50px",
                height: "50px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "blue",
              }}
            />
          </div>
          <div className="MessageError">{message}</div>
          <Button
            variant="contained"
            sx={{ width: "48.5ch", mt: 2, borderRadius: 3 }}
            onClick={collectData}
          >
            Continue
          </Button>
          <div className="DIDNT_RECIEVE">
            <span>Didn't Recieve Code?</span>
            <Link to="#" style={{ textDecoration: "none", color: "blue",margin: 3 }} onClick={resendOTP}>
              Resend OTP
            </Link>
          </div>
        </Grid>
      </Container>
    </Grid>
  );
};

export default VerifyOtp;
