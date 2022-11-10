import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./ResetPassword.css";

import { Link, useNavigate } from "react-router-dom";
import HeaderForOnboarding from "../HeaderForOnboarding";
import { Client_URL } from "../../Constants/Constant";
import { useSelector } from "react-redux";


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);
  let npassword;
  const [message, setMessage] = useState("");
  const EmailId = useSelector((state) => state.setEmailId);
  const email =EmailId.id;

  const HandleResetPassword = async () => {
    console.log("Running");
    console.log("Password", password, "Email", email);
    let result = await fetch(`${Client_URL}/v1/client/reset-Password`, {
      method: "PUT",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("result", result);
    if (result.statusCode === 200) {
      navigate("/Login");
    } else {
      setMessage(result.message);
    }
  };

  const checkValidation = (e) => {
    const confPass = e.target.value;
    if (password !== confPass) {
      setIsError("Password do not match");
    } else {
      setPassword(confPass);
      setIsError("");
    }
  };

  return (
    <Grid>
      <HeaderForOnboarding />
      <Container component="main" sx={{ width: 430 }}>
        <Grid align="center">
          <h1>Reset Password</h1>
        </Grid>
        <p style={{ fontSize: "20px", marginTop: 40 }}>Enter Password</p>
        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          style={{ background: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Enter Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p style={{ fontSize: "20px", marginTop: 40 }}>Retype Password</p>
        <TextField
          margin="normal"
          size="small"
          required
          fullWidth
          style={{ background: "white" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                >
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Enter Password"
          type={showPassword1 ? "text" : "password"}
          value={npassword}
          onChange={(e) => checkValidation(e)}
        />
        <div className="MessageError">{isError}</div>
        <div className="MessageError">{message}</div>
        <Button
          variant="contained"
          sx={{ width: "48.5ch", mt: 5, borderRadius: 3 }}
          onClick={HandleResetPassword}
        >
          Reset Password
        </Button>
        <div className="Link">
          <Link
            to="/Login"
            style={{
              textDecoration: "none",

              color: "blue",
            }}
          >
            Back To Login
          </Link>
        </div>
      </Container>
    </Grid>
  );
}

export default ResetPassword;
