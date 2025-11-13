import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({message}) => {
    const navigate = useNavigate();
    const isCustom = Boolean(message);
  return (
    <Box textAlign='center' mt={10}>
        <Typography variant='h5' gutterBottom>
          {isCustom?'Error':'404 - Page Not Found'}</Typography>
        <Typography variant='body1' mb={3}>
            {isCustom?message:"Oops! The page you're looking for doesn't exist."}
        </Typography>
        <Button variant='contained' color='customOrange' sx={{color:'white',textTransform:'none'}} onClick={()=>navigate('/')}>
            Go to Homepage 
        </Button>
    </Box>
  )
}

export default ErrorPage