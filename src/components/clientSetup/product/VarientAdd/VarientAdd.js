import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const VarientAdd = () => {
  return (
    <Box
      sx={{
        height: 230,
        width: 546,
      }}
    >
      <div className="Heading" htmlFor="my-input">
        Variants/Add-On Name*
      </div>
      <TextField
        size="small"
        margin="normal"
        required
        fullWidth
        style={{ background: "white" }}
        id="my-input"
        placeholder="Enter Product name"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <div className="RadioButtons">
        <FormControl>
          {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Single Select"
              control={<Radio />}
              label="Single Select"
            />
            <FormControlLabel
              value="Multiple Select"
              control={<Radio />}
              label="Multiple Select"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="Buttons">
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
    </Box>
  );
};

export default VarientAdd;
