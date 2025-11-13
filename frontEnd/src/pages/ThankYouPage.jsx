import { Box, Button, Divider, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const ThankYouPage = () => {
    const {state} = useLocation();
    const orderId = state?.orderId;
    const navigate = useNavigate();
  return (
    <Box
        sx={{
            display:'flex',
            minHeight:'80vh',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            textAlign:'center',
            p:3
        }}
    >
        <CheckCircleOutlineIcon sx={{fontSize:80,color:'customGreen.main',mb:2}}/>

        <Typography variant='h4' gutterBottom>
            Thank you for placing your order!
        </Typography>

        <Typography variant='body1' sx={{maxWidth:500}}>
            We've received your order and are preparing it for shipment. You’ll get an email confirmation shortly.
        </Typography>

        <Typography variant='body2' sx={{ mt: 2 }}>
            Your order ID is <strong>#{orderId}</strong>. Please save it for reference.
        </Typography>

        <Divider sx={{my:4,width:'100%'}}/>

        <Box sx={{mt:4,display:'flex',gap:2}}>
            <Button variant='contained' color='customGreen' sx={{color:'white', textTransform:'none'}} onClick={()=>navigate("/products")}>
                Continue Shopping
            </Button>
            <Button variant="contained" color='customOrange' sx={{color:'white', textTransform:'none'}} onClick={()=>navigate("/orders")}>
                View My Orders
            </Button>
        </Box>
    </Box>
  )
}

export default ThankYouPage