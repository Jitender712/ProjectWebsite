import React, { useState } from "react";
import "./SignIn.css";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import MuiPhoneNumber from "material-ui-phone-number";
import google from "../../Image/google.png";
import { useNavigate } from "react-router-dom";

import { Client_URL } from "../../Constants/Constant";
import HeaderForOnboarding from "../HeaderForOnboarding";
import { useDispatch } from "react-redux";
import { setClientID, setEmailID } from "../../redux/action/EmailVerifyAction";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const collectData = async () => {
    console.log("Running");
    console.log(
      "Name",
      name,
      "Email",
      email,
      "PhoneNo",
      phoneNo,
      "Password",
      password
    );
    let result = await fetch(`${Client_URL}/v1/client/signUp`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log("signUp", result);
    dispatch(setEmailID(email));
    
    if (result.statusCode === 200) {
      dispatch(setClientID(result.data._id))
      navigate("/EmailVerify");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <Grid>
      <HeaderForOnboarding />
      <Container component="main" maxWidth="xs">
        <Grid align="center">
          <div className="Login">Sign Up</div>
        </Grid>
        <div className="Heading" htmlFor="username">
          User Name
        </div>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          style={{ background: "white" }}
          id="username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Enter Name"
          name="username"
          autoComplete="username"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="Heading" htmlFor="email">
          Email address
        </div>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          style={{ background: "white" }}
          id="email"
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

        <div className="Heading" htmlFor="password">
          Password
        </div>
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
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="Heading" htmlFor="mobile">
          Mobile No.
        </div>

        <div className="Mobile">
          <MuiPhoneNumber
            name="phone"
            // variant="outlined"
            data-cy="user-phone"
            style={{
              width: "377px",
              border: "none",
              display: "grid",
              margin: "10x",
            }}
            defaultCountry={"in"}
            value={phoneNo}
            onChange={setPhoneNo}
          ></MuiPhoneNumber>
          <IconButton>
         
          </IconButton>
        </div>
        <div className="MessageError">{message}</div>
        <Grid container>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={collectData}
          >
            Continue
          </Button>
          <Grid item xs align="center">
            <div className="HeadingLogin">
              Already have an account?
              <Link href="/Login" variant="body2" underline="hover" style={{margin: 3}}>
                {"Login"}
              </Link>
            </div>
          </Grid>
        </Grid>
        <Grid item xs align="center">
          Or
        </Grid>
        <Grid item xs={9} align="center">
          <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2,gap:"5px" }}>
            <img src={google} alt={GoogleIcon} />
            <Link href="/Dashboard" variant="body2" underline="hover">
              <div className="google">Login with Google</div>
            </Link>
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};
export default SignUp;
