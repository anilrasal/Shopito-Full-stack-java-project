import { Box, CircularProgress, Grid, keyframes, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import  {getDashboardStats} from "../services/adminService";
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Dashboard = () => {

  const [stats, setStats] = useState(null);

  useEffect(()=>{
    getDashboardStats()
    .then((res)=>{
      console.log(res.data);
      setStats(res.data);
    });
  },[]);

  const items = stats?
  [
    {label: "Products", value: stats.totalProducts, icon:<InventoryIcon/>},
    {label: "Orders", value: stats.totalOrders, icon:<ShoppingCartIcon/>},
    {label: "users", value: stats.totalUsers, icon:<PeopleIcon/>},
    {label: "Revenue", value: stats.totalRevenue, icon:<InventoryIcon/>},
  ]:[];

  return (
    <>
    
    <Grid container spacing={2}>
      {items.map((item,index)=>(
        <Grid size={{xs:12,sm:6,md:3}} key={index}>
          {!stats&&<CircularProgress/>}
          <Paper elevation={3} sx={{p:2, display:'flex', alignItems:"center"}}>
            {item.icon}
            <Box ml={2}>
              <Typography variant='h6'>{item.value}</Typography>
              <Typography variant='body2'>{item.label}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))
      }
    </Grid>
    </>
  )
}

export default Dashboard