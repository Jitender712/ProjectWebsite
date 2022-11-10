import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const PopUpCreateOrder = (props) => {
  const { title, children, openPopupCreate, setOpenPopupCreate } = props;

  return (
    <div className="SubsciptionContainer">
      <Dialog
        open={openPopupCreate}
        maxWidth="900px"
        style={{ borderRadius: "10px" }}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            component="div"
            style={{
              alignItems: "center",
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div />
            {title}
            <CloseOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenPopupCreate(false)}
            />
          </Typography>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpCreateOrder;
