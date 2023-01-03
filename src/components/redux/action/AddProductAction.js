import axios from "axios";
import { Client_URL } from "../../Constants/Constant";
import {
  CATEGORY_ADD,
  CATEGORY_ADD_FAIL,
  CATEGORY_ADD_LIST,
  CATEGORY_FAIL_LIST,
  CATEGORY_ID,
  PRODUCT_ADD,
  PRODUCT_ADD_FAIL,
} from "../constants/AddProductConstant";

export const categoryAdd = (name, description, token) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${Client_URL}/v1/client/addProductCategory`,
      { name, description },
      config
    );
    dispatch({
      type: CATEGORY_ADD,
      payload: data,
    });
    console.log("data", data);
    if (data.statusCode === 200) {
      alert("Category Add");
      
    } else {
      alert("Already Exist");
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_ADD_FAIL,
      payload:
        error.response && error.response.message
          ? "Category Already exist"
          : // error.response.data.message,
            error.message,
    });
  }
};
export const categoryAddList = (token, page) => async (dispatch) => {
  // console.log("Token");
  try {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${Client_URL}/v1/client/listProductCategories`,
      { page },
      config
    );
    dispatch({
      type: CATEGORY_ADD_LIST,
      payload: data,
    });
    console.log("data1", data);
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL_LIST,
      payload:
        error.response && error.response.message
          ? "Category Already exist"
          : // error.response.data.message
            error.message,
    });
  }
};

export const productAdd =
  (name, price, discount, description, productCategoryId, token) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Client_URL}/v1/client/addProduct`,
        { name, price, discount, description, productCategoryId },
        config
      );
      dispatch({
        type: PRODUCT_ADD,
        payload: data,
      });
      console.log("ADD Product", data);
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload:
          error.response && error.response.message
            ? "Category Already exist"
            : // error.response.data.message
              error.message,
      });
    }
  };

  export const setCategoryId = (id) => {
    return {
      type: CATEGORY_ID,
      payload: id,
    };
  };