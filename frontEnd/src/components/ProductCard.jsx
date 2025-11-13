import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { addCartItem, addItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { Box, Stack, Tooltip } from '@mui/material'
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom'

const ProductCard = ({product,onAddToCart, selectedCategory}) => {
    const dispatch = useDispatch();

    const handleAddToCart = ()=>{
        //Local item:
        const localItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image?.[0]?.original,
            quantity: 1 // Default quantity to 1
        }

        //Optimistically update UI
        dispatch(addItem(localItem));

        //Save to backend
        const payload = {
            quantity:1,
            userId:1,
            productId:product.id
        }

        dispatch(addCartItem(payload)).unwrap()
        .then(()=>{
            if(onAddToCart) onAddToCart(); //Trigger snackbar
        })
        .catch((err)=>{
            console.error("Failed to sync cart:", err);
        })
    }
  return (
    <Box 
    sx={{
        transition:'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover':{
            transform: 'scale(1.03)',
            boxShadow:6
        },
    }}>
        <Card sx={{
            textAlign:'center'
        }}>
            {/* Wrapped with link to product page */}
        <Box 
            component={Link}
            to={`/product/${product.id}`}
            sx={{
                textDecoration:'none',
                color:"inherit"
            }}  
        >
            <CardMedia 
                component="img"
                height="300"
                sx={{
                    //objectFit:'cover',
                    objectFit:'contain',
                    margin:'auto',
                }}
                image={product.image?.[0]?.original}
                alt={product.name}
            >
            </CardMedia>
            <CardContent sx={{pt:1,px:2}}>
                <Tooltip title={product.name}>
                    <Typography 
                    variant='h6'
                    sx={{
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        display:'-webkit-box',// This is to truncate the name if it's long
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                    }}
                    >{product.name}</Typography>
                </Tooltip>
                <Rating
                    name={`rating-${product.id}`}
                    precision={0.5}
                    readOnly
                    size='small'
                    value={product.rating}
                />
                {/* price */}
                <Stack direction='row' gap={1} display='flex' justifyContent='center' alignItems='center' sx={{mt:1}}>
                    <Typography  variant='h6' color='error.main'>${product.price}</Typography>
                    <Typography style={{textDecoration:'line-through'}}  variant='body2' color='customButton'>${product.price}</Typography>
                </Stack>
            </CardContent>
        </Box>
            {/* Seperated add to cart button from link */}
            <CardContent sx={{pt:0,px:2}}>
                <Button 
                    variant='contained' 
                    // fullWidth 
                    sx={{ textTransform:'none',fontWeight:'bold'}}
                    onClick={handleAddToCart}
                    color='secondary'
                    >
                        Add to cart
                </Button>
            </CardContent>
        </Card>
    </Box>
  )
}

export default ProductCard