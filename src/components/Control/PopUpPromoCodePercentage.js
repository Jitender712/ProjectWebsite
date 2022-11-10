import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";


const PopUpPromoCodePercentage = (props) => {
  const { title, children, openPopUpPromoCodePercentage, setOpenPopUpPromoCodePercentage } = props;

  return (
    <Dialog open={openPopUpPromoCodePercentage} maxWidth="900px">
      <DialogTitle>
      <Typography
          variant="h6"
          component="div"
          style={{ marginLeft: "43%",flexGrow: 1, display : "flex" ,justifyContent: "space-between"}}
        >
          {title}
          <CloseOutlined
            style={{
              cursor: "pointer",
            }}
            onClick={() => setOpenPopUpPromoCodePercentage(false)}
          />
        </Typography>
      </DialogTitle>
      <DialogContent>
      {children}
      </DialogContent>
    </Dialog>
  );
};

export default PopUpPromoCodePercentage;
