import * as React from 'react';
import Box from '@mui/material/Box';
import "./Productoption.css"
import { Paper } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

const Productoption=() =>{
    const [activeMenu, setActiveMenu] = React.useState('main');
    function DropdownItem(props) {
        return (
          <a href="/" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button">{props.leftIcon}</span>
            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </a>
        );
      }
    console.log(activeMenu);
  return (
    <Box >
         <Paper
          elevation={3}
         sx={{ml:25,mr:1,borderRadius:3}}
        >
      <div className='dropdown'>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownItem>Variants/Add-one</DropdownItem>
        <DropdownItem>Disable</DropdownItem>
        <DropdownItem>Change Category</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </div>
      </Paper>
    </Box>
  );
}
export default Productoption;