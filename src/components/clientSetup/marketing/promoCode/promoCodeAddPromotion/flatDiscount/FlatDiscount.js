import React from 'react'
import "./FlatDiscount.css"
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
  } from "@mui/material";

const FlatDiscount = () => {
  return (
    <>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Promotion Name *</div>
        <div className="FlatTextField">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            placeholder="Enter Promotion Name"
          />
        </div>
      </div>
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Discounts (%)</div>
        <div className="FlatTextField">
          <TextField margin="normal" size="small" required fullWidth />
        </div>
      </div>
    </div>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Description Max 150 Characters * </div>
        <div className="FlatTextField">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
     
          />
        </div>
      </div>
    </div>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">From *</div>
        <div className="FlatTextField">
          <TextField
            type="date"
            margin="normal"
            size="small"
            required
            fullWidth
          />
        </div>
      </div>
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Till *</div>
        <div className="FlatTextField">
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
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Maximum Discount Value</div>
        <div className="FlatTextField">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            placeholder="₹"
          />
        </div>
      </div>
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Maximum No Of Allowed Users</div>
        <div className="FlatTextField">
          <TextField margin="normal" size="small" required fullWidth />
        </div>
      </div>
    </div>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Minimum Order Amount</div>
        <div className="FlatTextField">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            placeholder="₹"
          />
        </div>
      </div>
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Promotion Application Mode </div>
        <div className="FlatTextField">
          <TextField margin="normal" size="small" required fullWidth />
        </div>
      </div>
    </div>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">
          Allow single user to use the code multiple times? *
        </div>
        <div className="FlatTextField">
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
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Promotion Applied On</div>
        <div className="FlatTextField">
          <TextField margin="normal" size="small" required fullWidth />
        </div>
      </div>
    </div>
    <div className="ContainerFlat">
      <div className="Flat_Container_Box">
        <div className="FlatHeading">Promo Applicable On Order No.</div>
        <div className="FlatTextField">
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            placeholder=""
          />
        </div>
      </div>
      <div className="Flat_Container_Box">
        <div className="FlatButtons">
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
  )
}

export default FlatDiscount
