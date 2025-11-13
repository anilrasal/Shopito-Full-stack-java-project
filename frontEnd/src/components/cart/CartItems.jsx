import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import monitor from "../../assets/images/products/monitor.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, use } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addItem, removeAll, removeItem, fetchCartItems } from '../../features/cart/cartSlice';
import { incrementCartItem,decrementCartItem,removeItemFromCart } from '../../features/cart/cartSlice';

const CartItems = ({ items }) => {
    const hearders = ['Product', 'Title', 'Price', 'Quantity', 'Total', 'Remove'];
    const dispatch = useDispatch();
    return (
        <Box p={3}>
            {/* Cart headers */}
            <Grid container spacing={2} sx={{ mb: 1, fontWeight: 'bold', display: { xs: 'none', sm: 'flex' } }}>
                {hearders.map((header, i) => (
                    <Grid size={{ xs: 2 }} key={i}>{header}</Grid>
                ))}
            </Grid>

            {/* Cart items */}
            {items.map((item) => (
                <Fragment key={item.id}> {/*  */}
                    <Grid container spacing={2} alignItems='center'>
                        <Grid size={{ xs: 2 }}>
                            <Box
                                component='img'
                                src={item.image?.[0]?.original ?? monitor}
                                alt={item.name}
                                sx={{ witdh: '100%', maxWidth: 64 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <Typography variant='body1'>{item.name}</Typography>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <Typography variant='body1'>${item.price}</Typography>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <Box>
                                <IconButton onClick={() => {
                                    dispatch(decrementCartItem({ productId: item.id, userId:1, }));
                                    console.log("remove clicked");
                                    
                                }}
                                disabled={item.quantity <= 1}
                                >
                                    <RemoveCircleIcon color='secondary' />
                                </IconButton>
                                {item.quantity}
                                <IconButton onClick={() => dispatch(
                                    incrementCartItem({  productId: item.id,userId:1 }
                                ))}>
                                    <AddCircleIcon color='secondary' />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <Typography variant='body1'>${item.price * item.quantity}</Typography>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <IconButton onClick={() => {
                                console.log("Removing item with ID:", item.cartItemId);
                                dispatch(removeItemFromCart(item.cartItemId));
                                dispatch(fetchCartItems(1)); // Refresh cart items after removal                            
                            }}
                                >
                                <RemoveCircleOutlineIcon color='error' />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider />
                </Fragment>
            ))}
        </Box>
    )
}

export default CartItems