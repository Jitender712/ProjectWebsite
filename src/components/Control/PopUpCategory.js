import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

const PopupCategory = (props) => {
  const { title, children, openPopupCategory, setOpenPopupCategory } = props;

  return (
    <Dialog open={openPopupCategory}>
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
            onClick={() => setOpenPopupCategory(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupCategory;
