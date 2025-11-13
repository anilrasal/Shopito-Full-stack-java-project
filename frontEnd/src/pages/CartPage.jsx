import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, fetchCartItemsWithAuth, removeCartItems } from '../features/cart/cartSlice';
import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import CartItems from '../components/cart/CartItems'
import { useEffect } from 'react'


const CartPage = () => {
    const items = useSelector((state)=> state.cart.items??[]);
    const dispatch = useDispatch();
    const total = items.reduce((sum, item)=> sum+ item.price*item.quantity, 0);
    const isLoginedIn = !!localStorage.getItem("authToken"); // Placeholder for actual login state

    useEffect(()=>{
        if(!isLoginedIn) {
            console("Need to login");
        }else{
        dispatch(fetchCartItemsWithAuth());
        }
    },[]);

    const handleClearCart = () => {
        if(items.length === 0) return; // No need to clear an already empty cart
        
        const confirmed = confirm("Are you sure you want to clear the cart?");
        if(!confirmed) return;
        dispatch(removeCartItems(1)).unwrap().then(()=>{
            // Optionally show a notification that cart is cleared
        }).catch(err=>console.error("Failed to clear cart:", err));
    }
    
  return (
    <Container sx={{mt:4}}>
        {isLoginedIn?
        <Box mb={2}>
        <Typography variant='h5'>Your cart</Typography>
        
        {items.length === 0 ? (
            <Typography variant='body1' color="text.secondary">Your cart is empty</Typography>
        ):
        (
        <Box>
            <CartItems items={items}/>
        </Box>)
        }
        <Typography variant='h6' sx={{mt:2}}>
            Total: ${total}
        </Typography>
        <Stack direction='row' spacing={2} sx={{mt:2}}>
            <Button 
                color='error' 
                variant='contained'
                sx={{textTransform:'none'}}
                disabled={items.length === 0}
                onClick={handleClearCart}>
                Clear cart
            </Button>
            <Button 
                component={Link}
                to="/checkout"
                variant='contained'
                color='secondary'
                sx={{textTransform:'none',color:'white'}}
                disabled={items.length === 0}
            >
                Proceed to Checkout
            </Button>
        </Stack>
        </Box>:
        <Box mb={4}>
            {!isLoginedIn && (
                <Typography variant='body2' color="text.secondary">
                    Note: You are not logged in. Your cart items may not be saved.
                </Typography>
            )}
        </Box>
        }

    </Container>
  )
}

export default CartPage