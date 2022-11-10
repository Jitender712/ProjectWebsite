import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const PopupProduct = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          style={{
            marginLeft: "25%",
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
            onClick={() => setOpenPopup(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupProduct;
