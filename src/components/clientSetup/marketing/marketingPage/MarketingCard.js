import React from "react";
import "./MarketingCard.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddBanner from "../../../Image/AddBanner.png";
import PromoCodes from "../../../Image/PromoCodes.png";
import Discount from "../../../Image/Discount.png";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Link } from "@mui/material";

const MarketingCard = () => {
  return (
    <div>
      <div className="CardSS">
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            "& > :not(style)": {
              width: "-webkit-fill-available",
              // height:220,
              m:2,
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
                src={AddBanner}
                alt="AddBanner"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Add Banners</span>
                </div>
                <div className="Month">
                  <span>
                    Design attractive banners to beautify your store or
                    advertise
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow_Setting">
              <Link href="/AddBanner">
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
              width: "-webkit-fill-available",
              // height:220,
              m:2,
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
                src={PromoCodes}
                alt="PromoCodes"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Promo Codes</span>
                </div>
                <div className="Month">
                  <span>
                    Create Coupons Code,offers and Attract.Your Customers
                    Attention{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow_Setting">
              <Link href="/PromoCode">
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
              width: "-webkit-fill-available",
              // height:220,
              m:2,
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
                src={Discount}
                alt="Discount"
                style={{
                  height: "60px",
                }}
              />
            </Box>
            <div className="Box1">
              <div className="Box2">
                <div className="Paragraph">
                  <span>Discount</span>
                </div>
                <div className="Month">
                  <span>
                    You Can Add or Edit Discounts For Each Product Or Store
                  </span>
                </div>
              </div>
            </div>
            <div className="Arrow_Setting">
              <Link href="Discount">
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

export default MarketingCard;
