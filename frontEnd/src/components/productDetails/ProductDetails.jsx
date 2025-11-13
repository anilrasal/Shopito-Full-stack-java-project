import { Box, Button, IconButton, Rating, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SizeSelector from './SizeSelector';
import { useState } from 'react';
import PhoneColorSelector from './PhoneColorSelector';

const ProductDetails = ({name,price,rating,description,reviews,quantity,setQuantity,onAddToCart,selectedCategory}) => {
  const dispatch = useDispatch();

  //Size of the product
  const [selected, setSelected] = useState("128GB"||"S");
  const [selectedColor,setSelectedColor] = useState("Midnight");

  return (
<Box 
  display='flex' 
  flexDirection='column' 
  sx={{
    p:2, 
    textAlign:{xs:'center',md:"flex-start"}, 
    alignItems:{xs:'center',md:'flex-start'},
    }}
  >
    <Typography variant='h5' fontWeight={600}>
        {name}
    </Typography>

    <Stack direction='row' alignItems='center'>
      <Typography variant='body1'>Price: </Typography>
      <Typography variant='h6' color='customButton'>${price}</Typography>
    </Stack>

    <Stack direction='row' alignItems='center'>
      <Typography>Rating: </Typography>
      <Rating precision={0.5} readOnly value={rating}/>
      <Typography>({reviews} reviews)</Typography>
    </Stack>

    <Typography variant='body1'sx={{mb:2}}>{description}</Typography>

    <Stack direction='row' alignItems='center' spacing={1} sx={{mb:2}}>
      <IconButton 
        disabled={quantity <= 1}
        onClick={()=>setQuantity((prev)=>Math.max(1,prev-1))}
        color='secondary'
      >
        <RemoveCircleRoundedIcon/>
      </IconButton>

      <Typography variant='body1'>{quantity}</Typography>

      <IconButton
        color='secondary'
        onClick={()=>setQuantity((prev)=>prev+1)}
      >
        <AddCircleRoundedIcon/>
      </IconButton>
    </Stack>
    
    {/* Size Selector sending the selectedCategoty to choose between fasion or electronics */}
     <Typography gutterBottom>
      Size:
     </Typography>
    <SizeSelector category={selectedCategory} selected={selected} setSelected={setSelected}/>

    <Typography gutterBottom>
      Color:
     </Typography>
    {/* Color selector buttons */}
    <PhoneColorSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>

    {/* Add to cart button */}
    <Button 
      variant='contained' 
      color='secondary' 
      sx={{
        textTransform:'none',
        color:'white'
      }} 
      onClick={onAddToCart}
      >
        Add to Cart
    </Button>
</Box>
  )
}

export default ProductDetails