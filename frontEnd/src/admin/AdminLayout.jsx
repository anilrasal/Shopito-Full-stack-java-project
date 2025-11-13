import { AppBar, Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/userService';

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [adminProfile, setAdminProfile] = React.useState(false);
  useEffect(()=>{
    getProfile().then(res=>{
      if(res.data.role === 'ADMIN'){
        setAdminProfile(true);
      }else{
        navigate('/admin/unauthorized');
      }
    }).catch(err=>{
      console.error("Error fetching admin profile:", err);
    })
    },[]);

  return (
    adminProfile && <Box sx={{display:'flex'}}>
      <AppBar position='fixed' sx={{zIndex:1201}}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant='h6' noWrap>Admin Panel</Typography>
          {/* Right-aligned profile section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Welcome, Admin
          </Typography>
          <Link to="/admin/profile">
            <Avatar alt="Admin" src="/path/to/avatar.jpg" />
          </Link>
        </Box>
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
            <ListItem>
              <ListItemButton onClick={()=>navigate("/admin")}>
                <ListItemText primary="Dashboard"/>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={()=>navigate("/admin/products")}>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={()=>navigate("/admin/orders")}>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={()=>navigate("/admin/users")}>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={()=>navigate("/")}>
                <ListItemText primary="Website Preview" />
              </ListItemButton>
            </ListItem>
          </List>
      </Drawer>
      <Box component="main" sx={{flexGrow:1,p:3,}}>
        <Toolbar/>
        <Outlet/>
      </Box>
      
    </Box>
  )
}

export default AdminLayout