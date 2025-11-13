import './App.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import { Box, CircularProgress } from '@mui/material'
import { Suspense } from 'react'

import AppRoutes from './routes/AppRoutes'
// ErrorBoundary is used to catch errors in the component tree and display a fallback UI instead of crashing the entire app.
// This is particularly useful for handling errors in lazy-loaded components, ensuring that the app remains functional even if a specific component fails to load or render correctly.

function App({mode,setMode}) {
  return (
    <Box display='flex' flexDirection="column" minHeight="100vh">
      <Suspense fallback={
        <Box sx={{display:'flex',alignItems:'center',margin:'auto',justifyContent:'center', height:'100%'}}>
          {/* <Typography>...Loading</Typography> */}
          <CircularProgress color='customOrange' size={50} />
        </Box>
      }>
        <AppRoutes mode={mode} setMode={setMode}/>
      </Suspense>
    </Box>
  )
}

export default App
