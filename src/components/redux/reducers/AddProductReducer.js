import { CATEGORY_ADD, CATEGORY_ADD_FAIL, CATEGORY_ADD_LIST, CATEGORY_FAIL_LIST, CATEGORY_ID, PRODUCT_ADD, PRODUCT_ADD_FAIL } from "../constants/AddProductConstant";


export const categoryAddReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD:
      return {
        ...state,
        id: action.payload,
      };
      case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const categoryAddListReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_LIST:
      return {
        ...state,
        id: action.payload,
      };
      case CATEGORY_FAIL_LIST :
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD:
      return {
        ...state,
        id: action.payload,
      };
      case PRODUCT_ADD_FAIL :
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export  const setCategoryIdReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ID:
      return {
        ...state,
        id: action.payload,
      };
      default :
      return state
  }
};