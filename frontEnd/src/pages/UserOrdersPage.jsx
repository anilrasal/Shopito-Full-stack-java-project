import React, { useEffect } from 'react'
import OrderCard from '../components/orders/OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders, fetchUserOrdersWithAuth } from '../features/order/orderSlice';
import { CircularProgress, Stack, Typography } from '@mui/material';

const UserOrdersPage = () => {
    const dispatch = useDispatch();
    const {status,error} = useSelector(state=>state.order);
    const userOrders = useSelector(state=>state.order.userOrders);
    
    useEffect(()=>{
        dispatch(fetchUserOrdersWithAuth());
    },[dispatch]);


    if(status==='loading'){
        return <CircularProgress/>;
    }
    if(error)
        return <Typography color='error'>{error}</Typography>
  return (
    <Stack spacing={3}>
        {userOrders?userOrders.map((order)=>(
            <OrderCard key={order.orderId} order={order} />
        )):<Typography>No orders found.</Typography>}
    </Stack>
  )
}

export default UserOrdersPage