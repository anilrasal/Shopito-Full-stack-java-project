import { Box, Container, Grid, Rating, Typography,Button, Stack, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import mockProducts from '../data/MockProducts';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useState } from 'react';

const ProductDetailsPage = () => {
  const {id} = useParams();//This is to take the parmeters from url and destructuring it.
  const product = mockProducts.find((p)=>p.id===parseInt(id));
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  return (
    <Container sx={{mt:6}}>
        <Grid container spacing={{xs:2,md:4}}height={400}>
            {/* Image */}
            {/* <Grid
                size={{xs:12,md:6}}
            >
              <Box
                component='img'
                src={product.image}
                alt={product.name}
                sx={{
                  width:'100%',
                  borderRadius:2,
                  height: { xs: 250, md: 400 },
                  objectFit:'cover'
                }}
              />
              
            </Grid> */}
            <Grid size={{xs:12,md:4}}>
              <Box sx={{ 
              maxWidth: '100%',
              '& .image-gallery-slide img': {
                  objectFit: 'cover',
                  height: '100%',
                  borderRadius: 8,
              }, 
              '& .image-gallery-thumbnail img': {
                borderRadius: 4,
              },}
            }>
              <ImageGallery
                items={product.image}
                thumbnailPosition="bottom"
                showPlayButton={false}
                showFullscreenButton={true}
                lazyLoad={true}
                renderLeftNav={(onClick,disabled)=>(
                  <Button
                    onClick={onClick}
                    disabled={disabled}
                    color='secondary'
                    sx={{
                      minWidth: 0,
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      fontSize: '1rem',
                      position: 'absolute',
                      top: '50%',
                      left: 10,
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      color:'white',
                    }}  
                  >
                    ‹
                  </Button>
                )}
                renderRightNav={(onClick, disabled) => (
                  <Button
                    onClick={onClick}
                    disabled={disabled}
                    sx={{
                      minWidth: 0,
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      fontSize: '1rem',
                      position: 'absolute',
                      top: '50%',
                      right: 10,
                      transform: 'translateY(-50%)',
                      zIndex: 2,
                      color:'white',
                    }}
                  >
                    ›
                  </Button>
                )}
              />
              </Box>
            </Grid>
            {/* Info */}
            <Grid size={{xs:12,md:6}}>
              <Stack direction='column' spacing={2}>
              <Typography variant='h4' fontWeight={700} mb={1}>
                {product.name}
              </Typography>
              <Stack direction="row">
                <Typography>Rated: </Typography>
                <Rating sx={{justifyContent:"center"}} value={product.rating} readOnly precision={0.5}/>
                <Typography>({product.rating})</Typography>
              </Stack>
              <Typography variant='h5' color='customButton' mt={2} mb={1}>${product.price}</Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
            {product.description}
            </Typography>
            <Typography color='customGreen' variant='body1'mb={3}>Stock available</Typography>
            <Stack direction='row' alignItems='center'>
              <Typography>Qty: </Typography>
              <IconButton onClick={()=>setQuantity((prev)=>Math.max(1,prev-1))}>
                <RemoveCircleRoundedIcon/>
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={()=>setQuantity((prev)=>Math.max(1,prev+1))}>
                <AddCircleRoundedIcon/>
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              color="customOrange"
              onClick={() => dispatch(addItem(product))}
              sx={{ 
                textTransform: 'none', 
                fontWeight: 'bold', 
                color:'white', 
                alignSelf: 'flex-start', // optional: aligns it to the left of the Stack
              }} 
            >
              Add to Cart
            </Button>
            </Stack>
            </Grid>
        </Grid>
    </Container>
  )
}

export default ProductDetailsPage