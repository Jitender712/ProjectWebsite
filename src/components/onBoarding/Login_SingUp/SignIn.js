import React, { useEffect, useState } from "react";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";

import google from "../../Image/google.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderForOnboarding from "../HeaderForOnboarding";
import { login } from "../../redux/action/LoginAction";


// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignIn = () => {
  const history = useNavigate();
  const location = useLocation;
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/Dashboard";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Grid>
      <HeaderForOnboarding/>
      <Container component="main" maxWidth="xs">
        <Grid align="center">
          <p className="Login">Login</p>
        </Grid>
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
        <p className="Heading0" htmlFor="password">
          Password
        </p>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="MessageError">{error}</div>}
        <Grid container>
          <Grid item xs align="right">
            <Link href="ForgetPassword" variant="body2" underline="hover">
              Forgot password?
            </Link>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid item xs align="center">
            <div className="HeadingLogin">
              Don't have an account?
              <Link href="/" variant="body2" underline="hover" style={{margin: 3}}>
                Sign up
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
export default SignIn;
