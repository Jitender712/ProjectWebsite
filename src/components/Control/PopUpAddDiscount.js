import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const PopUpAddDiscount = (props) => {
  const { title, children, openPopUpAddDiscount, setOpenPopUpAddDiscount } =
    props;

  return (
    <Dialog open={openPopUpAddDiscount} maxWidth="900px">
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          style={{
            marginLeft: "35%",
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <CloseOutlined
            style={{
              cursor: "pointer",
            }}
            onClick={() => setOpenPopUpAddDiscount(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUpAddDiscount;
