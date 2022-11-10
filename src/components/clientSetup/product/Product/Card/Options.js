import * as React from "react";
import Box from "@mui/material/Box";
import "./Options.css";
import { Paper } from "@mui/material";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

const Options = () => {
  const [activeMenu, setActiveMenu] = React.useState("main");
  function DropdownItem(props) {
    return (
      <a
        href="/"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
console.log("activeMenu",activeMenu);
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{ ml: 30, mr: 1, borderRadius: 3, position: "absolute" }}
      >
        <div className="dropdown">
          <DropdownItem>Add Product</DropdownItem>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Disable</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </div>
      </Paper>
    </Box>
  );
};
export default Options;
