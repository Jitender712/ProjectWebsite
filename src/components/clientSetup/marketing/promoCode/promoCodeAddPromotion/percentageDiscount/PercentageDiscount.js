import React from "react";
import "./PercentageDiscount.css"
import {
  // Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const PercentageDiscount = () => {
  return (
    <>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Promotion Name *</div>
          <div className="PercentageTextField">
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              placeholder="Enter Promotion Name"
            />
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Discount (%)</div>
          <div className="PercentageTextField">
            <TextField margin="normal" size="small" required fullWidth />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Description Max 150 Characters * </div>
          <div className="PercentageTextField">
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">From *</div>
          <div className="PercentageTextField">
            <TextField
              type="date"
              margin="normal"
              size="small"
              required
              fullWidth
            />
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Till *</div>
          <div className="PercentageTextField">
            <TextField
              type="date"
              margin="normal"
              size="small"
              required
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Maximum Discount Value</div>
          <div className="PercentageTextField">
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              placeholder="₹"
            />
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Maximum No Of Allowed Users</div>
          <div className="PercentageTextField">
            <TextField margin="normal" size="small" required fullWidth />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Minimum Order Amount</div>
          <div className="PercentageTextField">
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              placeholder="₹"
            />
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Promotion Application Mode </div>
          <div className="PercentageTextField">
            <TextField margin="normal" size="small" required fullWidth />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">
            Allow single user to use the code multiple times? *
          </div>
          <div className="PercentageTextField">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Promotion Applied On</div>
          <div className="PercentageTextField">
            <TextField margin="normal" size="small" required fullWidth />
          </div>
        </div>
      </div>
      <div className="ContainerPercentage">
        <div className="Percentage_Container_Box">
          <div className="PercentageHeading">Promo Applicable On Order No.</div>
          <div className="PercentageTextField">
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              placeholder=""
            />
          </div>
        </div>
        <div className="Percentage_Container_Box">
          <div className="PercentageButtons">
            <Button
              variant="contained"
              sx={{ borderRadius: 2, background: "grey" }}
            >
              Cancel
            </Button>
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PercentageDiscount;
