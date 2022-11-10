import { Box, Button, Paper, Switch, TextField } from "@mui/material";
import React from "react";
import "./Order.css";

const Order = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 4,
          p: 3,
          width: "-webkit-fill-available",
          borderRadius: 5,
        },
      }}
    >
      <Paper elevation={3}>
        <div className="Topic">
          <div className="Topic1">
            <h3>Order Setting</h3>
          </div>
        </div>
        <div className="Order_Settings">
          <div className="Outstanding_Payment">
            <span>Accept/Reject Order</span>
          </div>
          <div className="Outstanding_Text">
            Disable it to automatically accept all incoming orders. if enabled,
            then the admin will have to manually accept each order. click here
          </div>
          <div className="Switchs">
            <div className="Switch1">
              <Switch {...label} />
            </div>
          </div>
        </div> 
        {/* ---------------*/}

        <div className="Order_Acceptance">
          <div className="Order_Detailing">
             If the order is not accepted within x minutes, it would be cancelled
             automatically
           </div>
           <div className="Order_Detailing">
             Order Acceptance Time (In Minutes)
           </div>
           <div className="Text">
             <TextField
               id="outlined-basic"
               numInputs
               placeholder="0"
               size="small"
               variant="outlined"
               sx={{ width: 600, borderRadius: 4 }}
             />
           </div>
           <div className="Cancel_Save_Button">
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
        {/* ---------------*/}
        <div className="Order_Settings">
          <div className="Outstanding_Payment">
            <span>Edit Order</span>
          </div>
          <div className="Outstanding_Text">
          Enable this to allow the admin to edit their order before they are
         accepted by the admin/restaurants.
          </div>
          <div className="Switchs">
            <div className="Switch1">
              <Switch {...label} />
            </div>
          </div>
        </div>
        {/* ---------------*/}
        <div className="Order_Settings">
          <div className="Outstanding_Payment">
            <span>Veg Only Filter</span>
          </div>
          <div className="Outstanding_Text">
          Specific to food store - restaurants can mark products as veg or
           nonveg and customers can filter them using the veg only filter.
          </div>
          <div className="Switchs">
            <div className="Switch1">
              <Switch {...label} />
            </div>
          </div>
        </div>
        {/* ---------------*/}
        <div className="Order_Settings">
          <div className="Outstanding_Payment">
            <span>Menu</span>
          </div>
          <div className="Outstanding_Text">
          Enable this to allow restaurants to design their menu according to
             the time of day. after enabling, restaurants can find menu tab in
             their catalog section where they can define a timeslot for
             particular days and also associate products to this timeslot forming
             a menu.
          </div>
          <div className="Switchs">
            <div className="Switch1">
              <Switch {...label} />
            </div>
          </div>
        </div>
        {/* ---------------*/}
      </Paper>
    </Box>
  );
};

export default Order;
