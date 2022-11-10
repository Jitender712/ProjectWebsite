import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const PopUpVariant = (props) => {
  const { title, children, openPopupAdd, setOpenPopupAdd } = props;
  return (
    <Dialog open={openPopupAdd}>
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          style={{
            marginLeft: "30%",
            alignContent:"center",
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
            onClick={() => setOpenPopupAdd(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default PopUpVariant;
