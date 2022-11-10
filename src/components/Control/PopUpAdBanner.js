import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const PopUpAdBanner = (props) => {
  const { title, children, openPopupAdBanner, setOpenPopupAdBanner } = props;

  return (
    <Dialog open={openPopupAdBanner}>
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
            onClick={() => setOpenPopupAdBanner(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUpAdBanner;
