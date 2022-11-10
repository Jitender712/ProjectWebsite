import React, { useState } from "react";
import "./PromoCode.css";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PopUpPromoCodePercentage from "../../../Control/PopUpPromoCodePercentage";
import PromoCodeAdd from "./promoCodeAddPromotion/PromoCodeAdd";

const PromoCode = () => {
  const [openPopUpPromoCodePercentage, setOpenPopUpPromoCodePercentage] =
    useState(false);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "-webkit-fill-available",
            // height: 500,
            borderRadius: 5,
            pb: 5,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Head5">
            <h3>Promo Codes</h3>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, height: 40, mt: 1, mr: 1 }}
              onClick={() => setOpenPopUpPromoCodePercentage(true)}
            >
              Add Promotion
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ m: 1 }}>
              <TableHead sx={{ backgroundColor: "#EFF6FF" }}>
                <TableRow>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Code
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Value
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Maximum Discount
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Minimum Order Amount
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Start Date
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    End Date
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Promo Application Mode
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Promo Code
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, fontWeight: 600 }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <PopUpPromoCodePercentage
          title="Add Promotion"
          openPopUpPromoCodePercentage={openPopUpPromoCodePercentage}
          setOpenPopUpPromoCodePercentage={setOpenPopUpPromoCodePercentage}
        ><PromoCodeAdd/>
        </PopUpPromoCodePercentage>
      </Box>
    </div>
  );
};

export default PromoCode;
