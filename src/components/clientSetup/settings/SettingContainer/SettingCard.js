import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import customer from "../../../Image/customer.png"
import Restaurant from "../../../Image/Restaurant.png"
import Delivery from "../../../Image/Delivery.png"
import OrderSetitng from "../../../Image/OrderSetting.png"
import Payment from "../../../Image/Payment.png"
import Notification from "../../../Image/Notification.png"
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "./SettingCard.css";
import { Link } from "@mui/material";
const SettingCard = () => {
  return (
    <div className="Cards">
      <div className="CardSS">
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: "-webkit-fill-available",
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
              <img
                src={Restaurant}
                alt="Restaurant"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Store</span>
                </div>
                <div className="Month">
                  <span>
                    Add/Update The Logo, Store Location, And Other Basic Detail.
                  </span>
                </div>
                <div className="Arrow">
                  <Link href="Restaurant">
                    <KeyboardBackspaceOutlinedIcon
                      sx={{ color: "blue", rotate: "180deg" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,

              width: "-webkit-fill-available",

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
              <img
                src={OrderSetitng}
                alt="OrderSetitng"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Order Settings</span>
                </div>
                <div className="Month">
                  <span>You can manage your common order settings here!</span>
                </div>
              </div>
            </div>
            <div className="Arrow1">
              <Link href="/Order">
                <KeyboardBackspaceOutlinedIcon
                  sx={{ color: "blue", rotate: "180deg" }}
                />
              </Link>
            </div>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: "-webkit-fill-available",

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
              <img
                src={Payment}
                alt="Payment"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Payments</span>
                </div>
                <div className="Month">
                  <span>
                    Set up and accept online payments via wallet, UPI, debit, or
                    credit cards
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <Link href="/Payment">
                <KeyboardBackspaceOutlinedIcon
                  sx={{ color: "blue", rotate: "180deg" }}
                />
              </Link>
            </div>
          </Paper>
        </Box>
      </div>
      <div className="CardSS">
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,

              width: "-webkit-fill-available",

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
              <img
                src={Delivery}
                alt="Delivery"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Delivery</span>
                </div>
                <div className="Month">
                  <span>
                    Control Your Delivery Modes, Delivery Time, And Delivery
                    Charges.
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <Link href="/Delivery">
                <KeyboardBackspaceOutlinedIcon
                  sx={{ color: "blue", rotate: "180deg" }}
                />
              </Link>
            </div>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,

              width: "-webkit-fill-available",

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
              <img
                src={customer}
                alt="customer"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Customers List</span>
                </div>
                <div className="Month">
                  <span>
                    View The Customer's Details As Well As Their Registration
                    Date.
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <Link href="/CustomerList">
                <KeyboardBackspaceOutlinedIcon
                  sx={{ color: "blue", rotate: "180deg" }}
                />
              </Link>
            </div>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              width: "-webkit-fill-available",

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
              <img
                src={Notification}
                alt="Notification"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Notification Settings</span>
                </div>
                <div className="Month">
                  <span>
                    Select The Type Of Notifications You Want To Send.
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow">
              <Link href="/Notification">
                <KeyboardBackspaceOutlinedIcon
                  sx={{ color: "blue", rotate: "180deg" }}
                />
              </Link>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default SettingCard;
