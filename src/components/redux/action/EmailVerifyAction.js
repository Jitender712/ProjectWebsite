import axios from "axios";
import { Client_URL } from "../../Constants/Constant";
import {
  EMAIL_VERIFY_FAIL,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_ID,
  CLIENT_ID,
} from "../constants/EmailVerifyConstant";

export const email_verify = (email) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${Client_URL}/v1/client/forgotPassword`,
      { email },
      config
    );
    dispatch({
      type: EMAIL_VERIFY_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: EMAIL_VERIFY_FAIL,
      payload:
        error.response && error.response.message
          ? "Email Must Be A Valid Email"
          :  error.message,
    });
  }
};

export const setEmailID = (email) => {
  return {
    type: EMAIL_ID,
    payload: email,
  };
};
export const setClientID = (id) => {
  return {
    type: CLIENT_ID,
    payload: id,
  };
};