import React from 'react'
import "./Payment.css"
import { Box, Paper, Switch } from "@mui/material";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Payment = () => {
  return (
    <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 2,
            // width: 1010,
            // height: 480,
            borderRadius: 5,
            pb:5
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Head2">
            <h3>Order Settings</h3>
          </div>
          <div className="Order_Setting">
            <div className="Outstanding_Payment">
              <span>Outstanding Payment</span>
            </div>
            <div className="Outstanding_Text">
              Add debt to your customer account against outstanding
              payments/cancellation fees/ad-hoc changes.this will reflect on the
              customer account as soon as the customer opens web/mobile
              application.
              <div className="Mandatory">Mandatory</div>
              <div className="Mandatory_text">
                If marked mandatory,the customer won't be able to place another
                order before clearing out the outstanding payment left with
                his/her last order placed.
              </div>
            </div>
            <div className="Switchs">
              <div className="Switch1">
                <Switch {...label} />
              </div>
              <div className="Switch2">
                <Switch {...label} />
              </div>
            </div>
          </div>
          <div className="Order_Setting1">
            <div className="Payment_Option">Payment Option</div>
            <div className="Cash_On_Delievery">
              Cash On Delievery
              <div className="Cash_on_Delievery_text">
                To Provides Customers The Ability To Settle Order Payment
                Through Cash.
              </div>
              <div className="Pay_On_Delievery">Pay On Delievery
              <div className="Cash_on_Delievery_text">
                To Provides Customers The Ability To Settle Order Payment
                Through Card.
              </div></div>
              <div className="Pay_On_Delievery">Pay Later
              <div className="Cash_on_Delievery_text">
                To Provides Customers The Ability To Settle Order Payment
                Through Off-Platform.
              </div></div>
            </div>
            
            <div className="Switchs">
              <div className="Switch3">
                <Switch {...label} />
              </div>
              <div className="Switch4">
                <Switch {...label} />
              </div>
              <div className="Switch5">
                <Switch {...label} />
              </div>
            </div>
           
          </div>
        </Paper>
      </Box>
  )
}

export default Payment
