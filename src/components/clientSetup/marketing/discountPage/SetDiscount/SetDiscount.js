import { Box, Button, TextField } from "@mui/material";
import React from "react";
import "./SetDiscount.css"

const SetDiscount = () => {
  return (
    <div>
      <Box
        sx={{
          width: 546,

        }}
      >
        <div className="ProductDetailContainer">

        <div className="Heading" htmlFor="my-input">
        Promotion Name *
        </div>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          style={{ background: "white" }}
          id="my-input"
       
          placeholder="Enter Promotion Name *"
          name="email"
          autoComplete="email"
          autoFocus
        />
          <div className="Heading" htmlFor="my-input">
         Discount*
        </div>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          style={{ background: "white" }}
          id="my-input"
      
          placeholder="Enter Discount"
          name="email"
          autoComplete="email"
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
        
          placeholder="Enter Description"
          name="email"
          autoComplete="email"
          autoFocus
        />
          <div className="Heading" htmlFor="my-input">
          From *
        </div>
        <TextField
              type="date"
              margin="normal"
              size="small"
              required
              fullWidth
            />
             <div className="Heading" htmlFor="my-input">
          Till *
        </div>
        <TextField
              type="date"
              margin="normal"
              size="small"
              required
              fullWidth
            />
          </div>
          
            <div className="ButtonSetDiscount">
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
    </div>
  );
};

export default SetDiscount;
