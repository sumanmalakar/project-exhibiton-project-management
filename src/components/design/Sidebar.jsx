
import {Link , Outlet, useNavigate} from 'react-router-dom'
import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
  import React from "react";
  import TaskIcon from '@mui/icons-material/Task';
  import DynamicFormIcon from '@mui/icons-material/DynamicForm';
  import ThreePIcon from '@mui/icons-material/ThreeP';
  import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
  import LogoutIcon from '@mui/icons-material/Logout';


  import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Groups3Icon from '@mui/icons-material/Groups3';



  import { getAuth, signOut } from "firebase/auth";


  const Sidebar = ({mode,setMode, open, setOpen}) => {
    const navigate = useNavigate();


    // firebase logout
    const logout = () =>{
      setTimeout(() => {
        
        // firebase logout
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate("/");
        }).catch((error) => {
          // An error happened.
        });
      }, 1500);
      }

      const [openSubMenu, setOpenSubMenu] = React.useState(false);

      const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
        if(!open){
          setOpenSubMenu(!openSubMenu);
        }
      };
    

     
    

    return (
      <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
          <List 
          //  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          //  component="nav"
          //  aria-labelledby="nested-list-subheader"
          
          >
            <Link to="/dashboard" style={{textDecoration:"none", color:"black"}}>
            <ListItem disablePadding  onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
             { open &&  <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>
            </Link>
            <Link to="/projects" style={{textDecoration:"none", color:"black"}}>
            <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
             { open &&  <ListItemText primary="Projects" />}
              </ListItemButton>
            </ListItem>
            </Link>

            <Link to="/tasks" style={{textDecoration:"none", color:"black"}}>
            <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
             { open &&  <ListItemText primary="Tasks" />}
              </ListItemButton>
            </ListItem>
            </Link>

            {/* <Link to="/users" style={{textDecoration:"none"}}>
            <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
             { open &&  <ListItemText primary="Users" />}
              </ListItemButton>
            </ListItem>
            </Link> */}

            {/* <Link to="/roles" style={{textDecoration:"none"}}>
            <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <ThreePIcon />
                </ListItemIcon>
             { open &&  <ListItemText primary="Roles" />}
              </ListItemButton>
            </ListItem>
            </Link> */}
            
           
           

            {/* submenu */}
          
      <ListItemButton onClick={handleClick}>
        <ListItemIcon >
          <InboxIcon />
        </ListItemIcon>
      { open && <ListItemText primary="Master" />}
      
      {open &&<ExpandMore /> }
        {/* {openSubMenu ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Link to="/roles" style={{textDecoration:"none", color:"black"}}>
        {open &&<ListItemButton sx={{pl:8}} >
           <ListItemIcon>
           <ThreePIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" /> 
          </ListItemButton>} 
          </Link>
          <Link to="/users" style={{textDecoration:"none", color:"black"}}>

        {open &&<ListItemButton sx={{pl:8}} >
           <ListItemIcon>
           <Group />
            </ListItemIcon>
            <ListItemText primary="Users" /> 
          </ListItemButton>} 
          </Link>

          <Link to="/teams" style={{textDecoration:"none", color:"black"}}>
        {open &&<ListItemButton  sx={{pl:8}} >
           <ListItemIcon>
              <Groups3Icon />
            </ListItemIcon>
            <ListItemText primary="Teams" /> 
          </ListItemButton>} 
          </Link>
        </List>
      </Collapse>

      <Link to="/form" style={{textDecoration:"none", color:"black"}}>
            <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <DynamicFormIcon />
                </ListItemIcon>
             { open &&  <ListItemText primary="Form" />}
              </ListItemButton>
            </ListItem>
            </Link>


      <ListItem disablePadding onClick={()=>setOpen(true)}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
             { open &&  <ListItemText 
             onClick={logout}
              primary="LogOut" />}
              </ListItemButton>
            </ListItem>



          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;
  