import React, { useState } from "react";
import "./DeliveryPage.css";
import { MenuItem, Paper, Select, Switch } from "@mui/material";
import { Box, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";

const DeliveryPage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [values, setValues] = useState("");

  const handleChange = (event) => {
    setValues(event.target.value);
  };
  const [values1, setValues1] = useState("");

  const handleChange1 = (event) => {
    setValues1(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          borderRadius: 5,
          pb: 5,
        },
      }}
    >
      <Paper elevation={3}>
        <div className="Head2">
          <h3>Delievery Settings</h3>
        </div>
        <div className="Box_Delievery">
          <div className="Delievery_Modes">Delievery Modes</div>

          <div className="Delievery_ModesText">
            Select the delievery modes that will be available on your platform.
            If both the delievery modes are enabled,the merchants can then
            choose between the two.
          </div>
        </div>

        {/*-------------------------*/}
        <div className="Box_Delievery">
          <div className="Space_For_Boxes"></div>
          <div className="Delievery_Mode_Options">
            <div className="Options">
              <div className="Options1">
                <div className="Checkbox1">
                  <Checkbox {...label} defaultChecked />
                  Take away
                </div>
                <div className="Checkbox1">
                  <Checkbox {...label} defaultChecked />
                  Home Delievery
                </div>
                <div className="Checkbox1">
                  <Checkbox {...label} defaultChecked />
                  Pick and Drop
                </div>
              </div>
              <div className="Select_Default">
                Select Default Delievery Modes:
              </div>
              <div className="Option_Delievery">
                <FormControl sx={{ mt: 3, minWidth: 150 }}>
                  <Select
                    value={values}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: 35, borderRadius: 2, background: "white" }}
                  >
                    <MenuItem value="">
                      <span>Select Delievery</span>
                    </MenuItem>
                    <MenuItem value={10}>Take away</MenuItem>
                    <MenuItem value={20}>Home Delievery</MenuItem>
                    <MenuItem value={30}> Pick and Drop</MenuItem>
                  </Select>

                  {/* <FormHelperText>Without label</FormHelperText> */}
                </FormControl>
              </div>
              <div className="Button_DelieveryCancel">
                <Button variant="contained" sx={{ background: "grey" }}>
                  Cancel
                </Button>

                <Button variant="contained" sx={{}}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/*p------------------- */}
        <div className="Box_Delievery">
          <div className="Delievery_Modes">Delievery Time</div>

          <div className="Delievery_ModesText">
            Enter here the deafult time taken for the delievery of an order.If a
            restaurants is handling their delievery by itself then he will enter
            his/her own delievery time.
          </div>
        </div>

        {/*-------------------------*/}
        <div className="Box_Delievery">
          <div className="Space_For_Boxes"></div>
          <div className="Delievery_Mode_Options">
            <div className="Options">
              <div className="Delievery_min">
                Delievery Time<span>(In Minutes)</span>
              </div>
              <div className="Option_Delievery">
                <FormControl sx={{ mt: 3, minWidth: 150 }}>
                  <Select
                    value={values1}
                    onChange={handleChange1}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ height: 35, borderRadius: 2, background: "white" }}
                  >
                    <MenuItem value="">
                      <span>Select Delievery</span>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="Button_DelieveryCancel">
                <Button variant="contained" sx={{ background: "grey" }}>
                  Cancel
                </Button>

                <Button variant="contained" sx={{}}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* --==-=-=------=-==-=-*/}
        <div className="Box_Delievery">
          <div className="Delievery_Modes">Free Delievery </div>

          <div className="Delievery_ModesText">
            Enter here the deafult time taken for the delievery of an order.If a
            restaurants is handling their delievery by itself then he will enter
            his/her own delievery time.(make sure your apps are updated)
          </div>
          <div className="Switch">
            <Switch {...label} />
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default DeliveryPage;
