import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Hero = ({heroImage}) => {
    const navigate = useNavigate();
  return (
    <Box 
        sx={{
            height:'80vh', 
            width:'100%',
            backgroundImage:`url(${heroImage})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            color:'#fff'
            }}>
            <Typography 
                variant='h2' 
                sx={{
                    fontSize:{xs: '2rem',sm:'2.5rem',md:'3.5rem'},
                    maxWidth:'80%',
                    textShadow: '0px 0px 6px rgba(0,0,0,0.6)',
                    textAlign:'center'
                    }}>
                        Discover your style
            </Typography>
            <Typography 
                variant='h5' 
                sx={{
                    fontSize:{xs:'1rem',sm:'1.25rem'},
                    maxWidth: '70%',
                    textShadow: '0px 0px 6px rgba(0,0,0,0.6)',
                    mb:2,
                    textAlign:"center"
                    }}
                    >
                        Unbeatable deals on top categories
            </Typography>
            
        <Button 
            variant='contained' 
            color='secondary' 
            sx={{
                textTransform:'none'
            }} 
            onClick={() => navigate('/products')}
            >
                Shop now
        </Button>
    </Box>
  )
}

export default Hero