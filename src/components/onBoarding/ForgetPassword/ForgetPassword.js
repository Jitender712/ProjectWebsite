import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

import { email_verify, setEmailID } from "../../redux/action/EmailVerifyAction";
import { useDispatch, useSelector } from "react-redux";
import HeaderForOnboarding from "../HeaderForOnboarding";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyEmail = useSelector((state) => state.verifyEmail);
  const { error } = verifyEmail;

  const collectData = (e) => {
    e.preventDefault();
    dispatch(email_verify(email));
    dispatch(setEmailID(email))
    if(error){
     console.log("Error");
    }else{

      navigate("/OtpVerify");
    }
  };

  return (
    <Grid>
      <HeaderForOnboarding/>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          marginTop: "100px",
          gap: 6,
        }}
      >
        <Grid align="center">
          <h1>Reset Password</h1>
        </Grid>
        <div className="Text_ResetPassword">
          <span>
            Enter your email to recieved instructions on how to reset your
            password.
          </span>
        </div>
        <p className="Heading0" htmlFor="my-input">
          Email address
        </p>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          style={{ background: "white" }}
          id="my-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Enter Email Id"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="MessageError">{error}</div>}
        <Grid container>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={collectData}
          >
            Next
          </Button>
        </Grid>
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
};

export default ForgetPassword;
