import React, { useState } from "react";
import "./AddBanner.css";
import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AddBannerData } from "../../../Data/AdBanner";
import PopUpAdBanner from "../../../Control/PopUpAdBanner";
import AdBanner from "./AdBannerDialogue/AdBanner";

const AddBanner = () => {
  const [openPopupAdBanner, setOpenPopupAdBanner] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,

        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          p: 1,
          width: "-webkit-fill-available",
          borderRadius: 5,
        },
      }}
    >
      <Paper>
        <div className="Add_Banner_Heading">
          <h3>Ad Banners</h3>
          <div className="Button10">
            <Button
              variant="contained"
              onClick={() => setOpenPopupAdBanner(true)}
            >
              Ad Banner
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#EFF6FF" }}>
              <TableRow>
                <TableCell>Images</TableCell>
                <TableCell>web Images</TableCell>
                <TableCell>Mobile Image</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Restaurants Id</TableCell>
                <TableCell>Restaurants Name</TableCell>
                <TableCell>External Link</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AddBannerData.map((row, id) => (
                <TableRow key={id}>
                  <TableCell>{row.image}</TableCell>
                  <TableCell>{row.Web_Image}</TableCell>
                  <TableCell>{row.Mobile_Image}</TableCell>
                  <TableCell>{row.Text}</TableCell>
                  <TableCell>{row.Restaurant_id}</TableCell>
                  <TableCell>{row.Restaurant_name}</TableCell>
                  <TableCell sx={{ color: "blue" }}>
                    {row.External_Link}
                  </TableCell>
                  <TableCell sx={{ color: "blue" }}>{row.Action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PopUpAdBanner
        title="Add Banner"
        openPopupAdBanner={openPopupAdBanner}
        setOpenPopupAdBanner={setOpenPopupAdBanner}
      >
        <AdBanner />
      </PopUpAdBanner>
    </Box>
  );
};

export default AddBanner;
