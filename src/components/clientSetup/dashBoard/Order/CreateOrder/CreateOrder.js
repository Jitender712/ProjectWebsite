import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import "./CreateOrder.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const CreateOrder = () => {
  return (
    <div className="OrderContainer_Box">
      <Box>
        <div>
          <div className="OrderContainer">
            <div className="CreateOrder_Heading">Select Customer</div>
            <div className="TextField">
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                placeholder="Customer"
                style={{
                  borderRadius: "10px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddCircleOutlineIcon
                        aria-label="toggle password visibility"
                        // onClick={AddCustomers}
                        style={{
                          cursor : "pointer"
                        }}                      
                      >
                      </AddCircleOutlineIcon>
                    </InputAdornment>
                  ),
                }}
              />
            
            </div>
          </div>
          <div className="OrderContainer">
            {" "}
            <div className="CreateOrder_Heading">Select Delivery Method</div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Take Away"
                name="radio-buttons-group"
                row
              >
                <div className="Radio_Button_Box">
                  <FormControlLabel
                    value="Take Away"
                    control={<Radio />}
                    label="Take Away"
                  />
                </div>
                <div className="Radio_Button_Box">
                  <FormControlLabel
                    value="Home Delivery"
                    control={<Radio />}
                    label="Home Delivery"
                  />
                </div>
                <div className="Radio_Button_Box">
                  <FormControlLabel
                    value="Pick and Drop"
                    control={<Radio />}
                    label="Pick and Drop"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className="OrderContainer">
            {" "}
            <div className="CreateOrder_Heading">
              Select Delivery Option</div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="On Demand"
                name="radio-buttons-group"
                row
              >
                <div className="Radio_Button_Box">
                  <FormControlLabel
                    value="On Demand"
                    control={<Radio />}
                    label="On Demand"
                  />
                </div>
                <div className="Radio_Button_Box">
                  <FormControlLabel
                    value="Scheduling"
                    control={<Radio />}
                    label="Scheduling"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className="OrderContainer">
            {" "}
            <div className="CreateOrder_Heading">Search Product</div>
            <div className="TextField">
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                placeholder="Product"
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <SearchIcon />
                //     </InputAdornment>
                //   ),
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <AddCircleTwoToneIcon />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>
          </div>
          <div className="OrderContainer">
            {" "}
            <div className="CreateOrder_Heading">Any Suggestion?</div>
            <div className="TextField">
              <TextField
                margin="normal"
                multiline
                rows={2}
                size="small"
                required
                fullWidth
                placeholder="Any Suggestion?"
              />
            </div>
          </div>
        </div>
      </Box>
      <div className="Button3">
        <Button
          variant="contained"
          sx={{
            marginLeft: "500px",
          }}
        >
          Invoice
        </Button>
      </div>
    </div>
  );
};

export default CreateOrder;
