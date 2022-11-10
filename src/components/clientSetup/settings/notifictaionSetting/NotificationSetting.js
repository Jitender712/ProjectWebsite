import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react'
import { notificationData } from '../../../Data/NotificationData';

const NotificationSetting = () => {

   
  return (
    <Box
    sx={{
      display: "flex",
      flex: 1,

      flexWrap: "wrap",
      "& > :not(style)": {
        m: 2,
        p:1,
        width: "-webkit-fill-available",
        borderRadius: 5,
      },
    }}
  >
    <Paper>
    <h3>Notification Settings</h3>
    <span>Select from below the type of notifications you want to send.</span>
    <h4>Admin Notification</h4>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#EFF6FF" }}>
          <TableRow>
            <TableCell>Events</TableCell>
            <TableCell align="right">SMS</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Notification</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notificationData.map((row,id) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.sms}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.Notification}</TableCell>
              <TableCell align="right">{row.Action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  </Box>
      

  )
}

export default NotificationSetting
