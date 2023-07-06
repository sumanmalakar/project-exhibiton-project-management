import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation } from 'react-router-dom';
import { customTheme } from '../../components/misc/customTheme';
import Logout from '../Pages/Logout';

const drawerWidth = 240;

export default function Sidebar({children}) {
  const location= useLocation()

const sidebar=[
  {
    title: "Admin",
    to: '/admin',
    icon: <DashboardOutlinedIcon/>,
    pathname: "/admin"
  },
  {
    title: "Supplier",
    to: '/supplier',
    icon: <AddBoxOutlinedIcon/> ,
    pathname: "/supplier"
  },
  {
    title: "Super Admin",
    to: '/superadmin',
    icon: <PeopleAltOutlinedIcon/>  ,
    pathname: "/superadmin"
  },
  {
    title: "Logout",
    to: '',
    icon: <LogoutOutlinedIcon/> ,
    pathname: <Logout/>
  },


]

  return (
    <>
    <Box sx={{ display: 'flex', '& .MuiDrawer-paper': {
      marginTop: 10,
    }}}>
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        sx={{
         
          padding: 12,
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
       
        {/* <Toolbar /> */}
        <Box sx={{ overflow: 'auto', "&  .MuiListItemText-primary ":{textDecoration:"none"} }}>
          <List>
           { console.log(location.pathname)}
           {sidebar.map(item =>{
            return(
            <Link to = {item.to} style={{textDecoration: "none", color:"white"}}>
              <ListItem disablePadding>
                <ListItemButton sx={{background:location.pathname==item.pathname?customTheme.color.secondary: "inherit",  color:"black", textDecoration:"none"}}>
                  <ListItemIcon>
                  {item.icon} 
                  </ListItemIcon>
                  <ListItemText primary={item.title}/>
                </ListItemButton>
              </ListItem>
            </Link>

            )
            })}
          </List>
          <Divider />
          
        </Box>
      </Drawer>
      <Box component="main" sx={{ marginTop:" 65px", flexGrow: 0 , px:4, width: "100%", backgroundColor:"#F2F2F2"}}>
        {children }
      </Box>
    </Box>
    </>
  );
}