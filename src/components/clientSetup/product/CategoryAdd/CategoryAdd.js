import React, { useState } from "react";
import "./CategoryAdd.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { categoryAdd } from "../../../redux/action/AddProductAction";
import { CategoryDataOptions } from "../../../Data/Categorydata";
import { useNavigate } from "react-router-dom";

function CategoryAdd(props) {
  const {openPopupCategory1 } = props
  const [openPopupCategory, setOpenPopupCategory] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const token = userInfo.data.token;

  const setCategory = useSelector((state) => state.setCategory);
  const { error } = setCategory;
  const CloseOnClick=()=>{
    setOpenPopupCategory(false)

  }

  const handleOnClick1 = (e) => {
    console.log(name, "Name", description, "Desc");
    e.preventDefault();
    dispatch(categoryAdd(name, description, token));
    // alert("Category Added");
      navigate("/Product");
  };

  return (
    <div>
      <div className="Box">
        <Box
          sx={{
            display: "flex",
            // flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: 546,
              height: 358,
              borderRadius: 5,
            },
          }}
        >
          <div>
            <div className="Heading">
              <div className="Head">
                <h4>Category Name*</h4>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={CategoryDataOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={name}
                      style={{
                        width: 500,
                        borderRadius: "18px",
                        margin: "10px",
                      }}
                      onSelect={(e) => setName(e.target.value)}
                      placeholder="Enter Category Name"
                      {...params}
                    />
                  )}
                />
              </div>

              <div className="Head">
                <h4>Description</h4>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ width: 500, borderRadius: "13px", margin: "10px" }}
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <div className="MessageError">{error}</div>}
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
                // onClick={()=>handleOnClick()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: 2 }}
                onClick={handleOnClick1}
              >
                Add
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default CategoryAdd;
