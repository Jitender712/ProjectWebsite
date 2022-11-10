import React, { useEffect, useState } from "react";
import "./CustomerData.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Client_URL } from "../../../Constants/Constant";
import { useSelector } from "react-redux";

function CustomerCard() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clientId = userInfo.data._id;
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    console.log("clientid", clientId);

    fetch(`${Client_URL}/v1/client/listCustomers?clientId=${clientId}`)
      .then((result) => {
        result.json().then((resp) => {
          setCustomer(resp.data);
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
      // console.log("CustomerList" , customer);
  }, [clientId]);


  return (
    <div className="Container4">
      <Box
        sx={{
          display: "flex",

          "& > :not(style)": {
            m: 2,
            width: "-webkit-fill-available",
            borderRadius: 5,
          },
        }}
      >
        <Paper elevation={3} sx={{ width: 1050 }}>
          <div className="CustomerList">
            <div className="Head2">
              <h3>Customer List</h3>
            </div>
            <div className="Symbol">
              <div className="Icons">
                <LogoutIcon sx={{ rotate: "270deg" }} />
              </div>
              <div className="Icons">
                <ExitToAppOutlinedIcon sx={{ rotate: "90deg" }} />
              </div>
              <div className="Icons">
                <FilterAltOutlinedIcon />
              </div>
            </div>
          </div>
          <div className="Order_Table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "lightblue" }}>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Last Used Platform</TableCell>
                  <TableCell align="center">Registration Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.map((row, id) => (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phoneNo}</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">{row.createdAt}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon sx={{ color: "blue" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default CustomerCard;
