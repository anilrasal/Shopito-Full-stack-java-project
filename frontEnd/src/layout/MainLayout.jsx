import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import NavBar from '../components/navbar/NavBar'
import { Box } from '@mui/material'

const MainLayout = ({mode,setMode}) => {
  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      minHeight:'100vh'
      }}
    >
        <NavBar mode={mode} setMode={setMode} />
        <Outlet/>
        <Footer/>
    </Box>
  )
}

export default MainLayout