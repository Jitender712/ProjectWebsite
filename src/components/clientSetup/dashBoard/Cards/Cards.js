import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import customer from "../../../Image/customer.png";
import Sales from "../../../Image/Sales.png";
import OrderImg from "../../../Image/Orders.svg";
import "./Cards.css";
import Order from "../Order/Order";

const Cards = () => {
  return (
    <div className="Cards">
      <div className="Card">
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: "-webkit-fill-available",
              height: 170,
              borderRadius: 5,
            },
          }}
          elevation={0}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                ml: 2,
                mt: 3,
                fontSize: 60,
              }}
            >
              <img src={customer} alt="customer" style={{
                  height: "60px",
                }} />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Customers</span>
                </div>
                <div className="Month">
                  <span>This Month</span>
                </div>
              </div>

              <div className="Counting">
                <span>00</span>
              </div>
            </div>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            "& > :not(style)": {
              m: 2,
              // width: 300,
              width: "-webkit-fill-available",
              height: 170,
              borderRadius: 5,
            },
          }}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                ml: 2,
                mt: 3,
                fontSize: 60,
              }}
            >
              <img src={Sales} alt="sales" style={{
                  height: "60px",
                }}/>
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Sale</span>
                </div>
                <div className="Month">
                  <span>This Month</span>
                </div>
              </div>

              <div className="Counting1">
                <span>₹0.0</span>
              </div>
            </div>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            "& > :not(style)": {
              m: 2,
              // width: 300,
              width: "-webkit-fill-available",
              height: 170,
              borderRadius: 5,
            },
          }}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                ml: 2,
                mt: 3,
                fontSize: 60,
              }}
            >
              <img src={OrderImg} alt="Order" style={{
                  height: "60px",
                }} />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Order</span>
                </div>
                <div className="Month">
                  <span>This Month</span>
                </div>
              </div>

              <div className="Counting3">
                <span>00</span>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
      <Order />
    </div>
  );
};
export default Cards;
