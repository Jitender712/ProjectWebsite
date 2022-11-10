import { EMAIL_VERIFY_FAIL, EMAIL_VERIFY_SUCCESS,EMAIL_ID, CLIENT_ID } from "../constants/EmailVerifyConstant";

export const emailVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_VERIFY_SUCCESS:
      return { loading: false, emaildetails: action.payload };
    case EMAIL_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export  const setEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_ID:
      return {
        ...state,
        id: action.payload,
      };
      default :
      return state
  }
};
export  const setClientIdReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_ID:
      return {
        ...state,
        id: action.payload,
      };
      default :
      return state
  }
};

