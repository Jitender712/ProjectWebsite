import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constants/SideBar";

export const setToggleReducer = (state = {}, action) => {
  switch (action.type) {
    // case TOGGLE:
    //   return {
    //     ...state,
    //     id: action.payload,
    //   };
    case TOGGLE_TRUE:
      return {
        ...state,
        id: (action.payload = true),
      };
    case TOGGLE_FALSE:
      return {
        ...state,
        id: (action.payload = false),
      };
    default:
      return state;
  }
};
