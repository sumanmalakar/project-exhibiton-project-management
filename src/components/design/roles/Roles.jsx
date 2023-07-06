/* eslint-disable react/jsx-no-undef */
import {Link} from 'react-router-dom'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Mail, Notifications } from "@mui/icons-material";
import { getAuth} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'



import Sidebar from '../Sidebar'
import RoleTable from './RoleTable'
// import CollapsibleTable from './CollapsibleTable'

import {
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
// import resoluteailogo from "../../assets/images/resoluteailogo.png";
import resoluteailogo from "../../../assets/images/resoluteailogo.png";
import  { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const color = {
  color: 'white',
  background:'red'
}

export default function Tasks() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 
  const navigate = useNavigate()

  const onLogout = () => {
    getAuth().signOut()
    navigate('/')
  }
  return (
   <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{
        backgroundColor: "white",
        color: "black",
        display: "flex",
        justifyContent: "center"
      }}>
        <StyledToolbar >     
        <Toolbar>
          <IconButton
            color="red"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">

          <Link to="/dashboard">
            <logo sx={{
              backgroundColor: "beige"
            }}>
              <img
                src={resoluteailogo}
                alt="Facegenie-logo"
                style={{ width: "20%" }} />
            </logo>
            </Link>
          </Typography>
        </Toolbar>
        <Toolbar>
          <Icons>
           <Badge badgeContent={4} color="error">
             <Mail />
           </Badge>
           <Badge badgeContent={2} color="error">
             <Notifications />
           </Badge>
           <Avatar
              sx={{ width: 30, height: 30 }}
              src={getAuth().currentUser.photoURL}
              onClick={(e) => setOpenMenu(true)} />
          </Icons>
          <UserBox onClick={(e) => setOpenMenu(true)}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src={getAuth().currentUser.photoURL}
               />
            <Typography variant="span">John</Typography>
          </UserBox>
      
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={openMenu}
          onClose={(e) => setOpenMenu(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>{getAuth().currentUser.displayName}</MenuItem>
        
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      </StyledToolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
      
        <Divider />
      
        <Sidebar open={open} setOpen = {setOpen}/>
      </Drawer><Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

{/* <Feed /> */}


        {/* <h1>DenseTable</h1> */}
        <br />
        <RoleTable color={color} />

        {/* <br />
        <h1>CollapsibleTable</h1>
        <br />
        <CollapsibleTable /> */}
     
        {/* <Home /> */}
        
      </Box>
    </Box>
  );
}