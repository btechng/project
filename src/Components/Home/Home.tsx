import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { FiLogIn } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import "./Home.css"
import { Link } from 'react-router-dom';


export default function Home() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='home-container'>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{color:"rgb(17, 17, 59)",  textAlign:"center", fontWeight:"bold",fontSize:"30px"}}>
          WELCOME
        </ListSubheader>
      }
    >
      {/* ==SIGN UP SECTION STARTS HERE== */}
      <Link to={"/signup"}>
      <ListItemButton>
        <ListItemIcon>
          <FiLogIn className='react-icons'/>
        </ListItemIcon>
        <ListItemText primary="Sign Up"/>
      </ListItemButton>
      </Link>
      {/* ==SIGN UP SECTION ENDS HERE== */}
      

      {/* ==LOGIN SECTION STARTS HERE== */}
      <Link to={"/login"}>
      <ListItemButton>
        <ListItemIcon>
          <FiLogIn className='react-icons'/>
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItemButton>
      </Link>
      {/* ==LOGIN SECTION ENDS HERE== */}
      

      {/* ==USER SECTION STARTS HERE== */}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FaUsers className='react-icons'/>
        </ListItemIcon>
        <ListItemText primary="Users" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* ==USER PROFILE== */}
          <Link to={"/userprofile"}>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Users Profile" />
          </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
    </div>
  );
}