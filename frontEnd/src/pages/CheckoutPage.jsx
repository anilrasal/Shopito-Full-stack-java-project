import { Button, Container, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { placeOrderFromUserCartThunk } from '../features/order/orderSlice';
import { getProfile } from '../services/userService';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state)=>state.cart.items);
    const total = items.reduce((sum,item)=>sum+item.price*item.quantity,0);
    
    const [customer, setCustomer] = useState({
        name: '', phone:'',address:''
    });

    useEffect(()=>{
        getProfile().then((res)=>{
            setCustomer({
                name: res.data.name,
                phone: res.data.phoneNumber || '',
                address: res.data.address || ''
            });
        })

    },[]);

    const isFormComplete = customer.name && customer.phone && customer.address;// check if all fields are filled

    const handleOrder=(e)=>{
        e.preventDefault();
        // Check if the form is complete and items are present
        if(!isFormComplete){
            alert("Please fill all fields.");
            return;
        }
        if(items.length === 0){
            alert("Please add items to the cart before placing an order.");
            return;
        }
        const confirmed = confirm("Are you sure?");
        if(!confirmed) return;
        if(confirmed && isFormComplete&& items.length > 0){
        dispatch(placeOrderFromUserCartThunk()).unwrap()
        .then((res)=>{
            console.log("Order placed:", res);
            const orderId = res.orderId; // res already contains data as we are unwrapping it. 
            // and as using Async Thunk, it returns res.data already. Hence, no need to do res.data
            navigate("/thankyou",{state:{orderId}});
        })
        .catch(err=>console.error("Failed to place order:", err));
        }
        
    }
  return (
    <Container sx={{mb:5}}>
        <Typography variant='h5' gutterBottom mb={4}>Checkout</Typography>
        {/* Delivery info */}
        <Grid container spacing={2} sx={{mb:4}}>
            <Grid size={{xs:12,sm:6}}>
                <TextField disabled label="Complete name" fullWidth value={customer.name} onChange={(e)=>setCustomer({...customer, name:e.target.value})}/>
            </Grid>
            <Grid size={{xs:12,sm:6}}>
                <TextField label="Phone number" fullWidth required value={customer.phone} onChange={(e)=>setCustomer({...customer, phone:e.target.value})}/>
            </Grid>
            <Grid size={{xs:12,sm:6}}>
                <TextField label="Delivery address" fullWidth required value={customer.address} onChange={(e)=>setCustomer({...customer, address:e.target.value})}/>
            </Grid>
        </Grid>
        {/* Cart Items */}
        <Typography variant='h6'>
            Order Summary
        </Typography>
        
        <List>
            {items.map((item,index)=>(
            <ListItem key={index}>
                <ListItemText primary={item.name} secondary={`$${item.price} x ${item.quantity} = $${item.price*item.quantity}`}/>
                <ListItemText/>
            </ListItem> 
            ))}
            <ListItem key="delivery-charge">
                <ListItemText primary="Delivery Charge" secondary="Free"/>
            </ListItem> 
        </List>
        
        <Divider/>
        <Typography>Total: ${total.toFixed(2)}</Typography>
        <Button 
            variant='contained'
            color='customOrange'
            sx={{
                mt:2,
                textTransform:'none',
                color:'white',
                fontWeight:'bold'
            }}
            disabled={!isFormComplete}
            onClick={(e)=>handleOrder(e)}
        >
            Place Order
        </Button>
    </Container>
  )
}

export default CheckoutPage