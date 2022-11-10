import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const PopUpSubscription = (props) => {
  const { title, children, openPopupSubs, setOpenPopupSubs } = props;

  return (
    <div className="SubsciptionContainer">
      <Dialog open={openPopupSubs} maxWidth="900px">
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
          ><div/>
            {title}
            <CloseOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => setOpenPopupSubs(false)}
            />
          </Typography>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpSubscription;
