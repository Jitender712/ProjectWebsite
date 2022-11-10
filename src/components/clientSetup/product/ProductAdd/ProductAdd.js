import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Client_URL } from "../../../Constants/Constant";
import { productAdd } from "../../../redux/action/AddProductAction";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const token = userInfo.data.token;
  const dispatch = useDispatch();

  let productCategoryId = "635f4f204a885ae6c569b1ff";

  const collectData = async () => {
    console.log("Running");
    console.log(
      "Name",
      name,
      "Price",
      price,
      "Discount",
      discount,
      "Description",
      description,
      "Id",
      productCategoryId
    );
    dispatch(
      productAdd(name, price, discount, description, productCategoryId, token)
    );
  };

  return (
    <div>
      <Box
        sx={{
          width: 546,
          height: 532,
          // backgroundColor: "snow",
        }}
      >
        <div className="ProductDetailContainer">
          <div className="Heading" htmlFor="my-input">
            Product Name*
          </div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            style={{ background: "white" }}
            id="my-input"
            placeholder="Enter Product name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="Heading" htmlFor="my-input">
            Price*
          </div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            style={{ background: "white" }}
            id="my-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Standard price for product"
            name="price"
            autoComplete="price"
            autoFocus
          />
          <div className="Heading" htmlFor="my-input">
            Discount
          </div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            style={{ background: "white" }}
            id="my-input"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Select a discount"
            name="discount"
            autoComplete="discount"
            autoFocus
          />
          <div className="Heading" htmlFor="my-input">
            Description
          </div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            style={{ background: "white" }}
            id="my-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </div>
        <div className="Drag">
          <span>
            Drag & Drop Image ,Or <span>browser</span>from computer
          </span>
        </div>
        <div className="Buttons">
          <Button
            variant="contained"
            sx={{ borderRadius: 2, background: "grey" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={collectData}
          >
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ProductAdd;
