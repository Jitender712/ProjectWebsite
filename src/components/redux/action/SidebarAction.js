import { TOGGLE, TOGGLE_FALSE, TOGGLE_TRUE } from "../constants/SideBar";

export const setToggle = (value) => {
    return {
      type: TOGGLE,
      payload : value
    };
  };

  export const setToggleTrue = (value) => {
    return {
      type: TOGGLE_TRUE,
      payload : value=true,
    };
  };
  export const setToggleFalse = (value) => {
    return {
      type: TOGGLE_FALSE,
      payload : value=false,
    };
  };