import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from "@mui/material/FormControl";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import "./Order.css";
import { Button } from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useState } from "react";
import PopUpCreateOrder from "../../../Control/PopUpCreateOrder";
import CreateOrder from "./CreateOrder/CreateOrder";
const Order = () => {
  const [openPopupCreate, setOpenPopupCreate] = useState(false);

  function createData(
    id,
    time,
    Deliverymode,
    Paymentmethod,
    OrderStatus,
    icon
  ) {
    return { id, time, Deliverymode, Paymentmethod, OrderStatus, icon };
  }
  const [age, setAge] = React.useState("");
  const rows = [
    createData(
      4568,
      "22/07/22,4:05",
      "-",
      "Debit Card",
      "Completed",
      MessageOutlinedIcon
    ),
    createData(
      4568,
      "22/07/22,4:05",
      "-",
      "Debit Card",
      "Completed",
      MessageOutlinedIcon
    ),
    createData(
      4568,
      "22/07/22,4:05",
      "-",
      "Debit Card",
      "Completed",
      MessageOutlinedIcon
    ),
    createData(
      4568,
      "22/07/22,4:05",
      "-",
      "Debit Card",
      "Completed",
      MessageOutlinedIcon
    ),
    createData(
      4568,
      "22/07/22,4:05",
      "-",
      "Debit Card",
      "Completed",
      MessageOutlinedIcon
    ),
  ];
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="Orders">
      <div
        className="Order"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 2,
              // width: "65vw",
              width: "-webkit-fill-available",
              // height: 400,
            },
          }}
        >
          <Paper elevation={3}>
            <div className="top_Corner">
              <div className="top_Left">
                <span>Orders</span>
              </div>
              <div className="top_Right">
                <div className="Date">To Date</div>

                <div className="Option">
                  <FormControl sx={{ mt: 3, minWidth: 150 }}>
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ height: 35, borderRadius: 2 }}
                    >
                      <MenuItem value="">
                        <span>All</span>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>

                    {/* <FormHelperText>Without label</FormHelperText> */}
                  </FormControl>
                </div>
                <div className="Button1">
                  <Button onClick={() => setOpenPopupCreate(true)}>
                    Create Order
                  </Button>
                </div>

                <div className="Filter">
                  <FilterAltOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="Order_Table">
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "lightblue" }}>
                  <TableRow sx={{ width: 90 }}>
                    <TableCell sx={{ fontWeight: 500, fontSize: 16 }}>
                      Order ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Order Time
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Delivery Mode
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Payment Method
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Order Status
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Chat
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 500, fontSize: 16 }}
                    >
                      Chat
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row, id) => (
                    <TableRow
                      key={id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.time}</TableCell>
                      <TableCell align="center">{row.Deliverymode}</TableCell>
                      <TableCell align="center">{row.Paymentmethod}</TableCell>
                      <TableCell align="center">{row.OrderStatus}</TableCell>
                      <TableCell align="right">{<row.icon />}</TableCell>
                      <TableCell align="right" style={{ cursor: "pointer" }}>
                        {<EditIcon />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Box>
      </div>
      <PopUpCreateOrder
        title="Create Order"
        openPopupCreate={openPopupCreate}
        setOpenPopupCreate={setOpenPopupCreate}
      >
        <CreateOrder />
      </PopUpCreateOrder>
    </div>
  );
};

export default Order;
