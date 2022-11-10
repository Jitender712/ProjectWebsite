import React, { useState } from "react";
import "./Discount.css";
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
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUpAddDiscount from "../../../Control/PopUpAddDiscount";
import PopUpSetDiscount from "../../../Control/PopUpSetDiscount";
import AddDiscount from "./AddDiscount/AddDiscount";
import SetDiscount from "./SetDiscount/SetDiscount";

const Discount = () => {
  const [openPopUpSetDiscount, setOpenPopUpSetDiscount] = useState(false);
  const [openPopUpAddDiscount, setOpenPopUpAddDiscount] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "-webkit-fill-available",
            borderRadius: 5,
            pb: 5,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Head5">
            <h3>Discount</h3>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, height: 40, mt: 1, mr: 1 }}
              onClick={() => setOpenPopUpSetDiscount(true)}
            >
              Set Discount
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              sx={{ ml: 1, mr: 1, width: "-webkit-fill-available" }}
            >
              <TableHead sx={{ backgroundColor: "#EFF6FF" }}>
                <TableRow>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Value
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    {" "}
                    Valid From
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Valid To
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>T-Shirts</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>
                    Neque porro quisquam est qui dolorem dolor
                  </TableCell>
                  <TableCell>20/09/2022</TableCell>
                  <TableCell>30/09/2022</TableCell>
                  <TableCell>
                    <ModeEditOutlinedIcon sx={{ color: "blue" }} />
                    <DeleteIcon sx={{ color: "blue", ml: 3 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>T-Shirts</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    Neque porro quisquam est qui dolorem dolor
                  </TableCell>
                  <TableCell>20/09/2022</TableCell>
                  <TableCell>30/09/2022</TableCell>
                  <TableCell>
                    <ModeEditOutlinedIcon sx={{ color: "blue" }} />
                    <DeleteIcon sx={{ color: "blue", ml: 3 }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="Entries">Showing 2 entries</div>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "-webkit-fill-available",
            borderRadius: 5,

            pb: 5,
          },
        }}
      >
        <Paper elevation={3}>
          <div className="Head5">
            <h3>Product Wise Discount</h3>
            <Button
              variant="contained"
              sx={{ borderRadius: 2, height: 40, mt: 1, mr: 1 }}
              onClick={() => setOpenPopUpAddDiscount(true)}
            >
              Add Discount
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table
              aria-label="simple table"
              sx={{ ml: 1, mr: 1, width: "-webkit-fill-available" }}
            >
              <TableHead sx={{ backgroundColor: "#EFF6FF" }}>
                <TableRow>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Value
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    {" "}
                    Valid From
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Valid To
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Maximum Amount
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>T-Shirts</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    Neque porro quisquam est qui dolorem dolor
                  </TableCell>
                  <TableCell>20/09/2022</TableCell>
                  <TableCell>30/09/2022</TableCell>
                  <TableCell>999/Price</TableCell>
                  <TableCell>
                    <ModeEditOutlinedIcon sx={{ color: "blue" }} />
                    <DeleteIcon sx={{ color: "blue", ml: 3 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>T-Shirts</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    Neque porro quisquam est qui dolorem dolor
                  </TableCell>
                  <TableCell>20/09/2022</TableCell>
                  <TableCell>30/09/2022</TableCell>
                  <TableCell>799/Price</TableCell>
                  <TableCell>
                    <ModeEditOutlinedIcon sx={{ color: "blue" }} />
                    <DeleteIcon sx={{ color: "blue", ml: 3 }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="Entries">Showing 2 entries</div>
        </Paper>
        <PopUpAddDiscount
          title="Add Discount"
          openPopUpAddDiscount={openPopUpAddDiscount}
          setOpenPopUpAddDiscount={setOpenPopUpAddDiscount}
        >
          <AddDiscount />
        </PopUpAddDiscount>
        <PopUpSetDiscount
          title="Set Discount"
          openPopUpSetDiscount={openPopUpSetDiscount}
          setOpenPopUpSetDiscount={setOpenPopUpSetDiscount}
        >
          <SetDiscount />
        </PopUpSetDiscount>
      </Box>
    </>
  );
};

export default Discount;
