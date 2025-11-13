import { Typography } from '@mui/material'
import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    }, []);
  return (
    <>
        <Typography>Logging out and redirecting to homepage...</Typography>
    </>
    
  )
}

export default Logout