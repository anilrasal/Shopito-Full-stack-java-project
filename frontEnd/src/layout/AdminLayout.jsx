import { AppBar, Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout = () => {
  return (
     <Box sx={{display:'flex'}}>
      <AppBar position='fixed' sx={{zIndex:1201}}>
        <Toolbar>
          <Typography variant='h6' noWrap>Admin Panel</Typography>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant='permanent'
        sx={{
          width:drawerWidth,
          [`& .MuiDrawer-paper`]:{width: drawerWidth, boxSizing:'border-box'}
        }}
      >
        <Toolbar />
          <List>
            <ListItem button component={Link} to="/admin">
              <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button component={Link} to="/admin/products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/admin/orders">
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
      </Drawer>
      <Box component="main" sx={{flexGrow:1,p:3,ml:`${drawerWidth}px`}}>
        <Toolbar/>
        <Outlet/>
      </Box>
      
    </Box>
  )
}

export default AdminLayout