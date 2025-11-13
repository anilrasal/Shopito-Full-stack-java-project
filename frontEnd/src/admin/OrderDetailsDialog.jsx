import React, { useEffect, useState } from 'react'
import { getOrderById, updateOrderStatus } from '../services/orderService';
import { Box, Button, DialogContent, DialogTitle, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const OrderDetailsDialog = ({orderId,onClose}) => {
    const [order, setOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const totalAmount = order?.orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const fetchDetails = async ()=>{
        try {
            const response = await getOrderById(orderId);
            setOrder(response.data);
            setNewStatus(response.data.status);
        } catch (error) {
            alert("Failed to load the order details");
        }
    }

    const handleStatusUpdate = async ()=>{
        try {
            const response = await updateOrderStatus(orderId,newStatus);
            alert("Order status updated.");
            onClose();
        } catch (error) {
            alert("Failed to update status.");
        }
        
    }

    useEffect(()=>{
        if(orderId){
            fetchDetails();
        }
    },[orderId]);
    if(!order || !order.orderItems) 
        return (
    <DialogContent>
      <Typography>Loading order details...</Typography>
    </DialogContent>
  );;
  return (
    <>
        <DialogTitle>Order #{order.orderId}</DialogTitle> 
        <DialogContent>
            <Typography variant='subtitle1'>Customer Id: {order.userId}</Typography>
            <Typography variant='subtitle2'>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
            <Typography variant='subtitle2'>Status: {order.status}</Typography>
        </DialogContent>  

        <Box sx={{mt:2,p:2}}>
            <Typography variant='h6'>Items</Typography>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.orderItems.map((item,index)=>(
                        <TableRow key={index}>
                            <TableCell>{item.product?.name||'Unnamed product'}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>₹{item.price}</TableCell>
                            <TableCell>₹{item.price * item.quantity}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={3}><strong>Total</strong></TableCell>
                        <TableCell><strong>${totalAmount}</strong></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box> 
        <Box sx={{mt:3,p:2}}>
            <Typography variant='subtitle2'>Update status</Typography>
            <Select
                value={newStatus}
                onChange={(e)=>setNewStatus(e.target.value)}
                sx={{minWidth:200,mt:1}}
            >
                <MenuItem value="PLACED">Placed</MenuItem>
                <MenuItem value="SHIPPED">Shipped</MenuItem>
                <MenuItem value="DELIVERED">Delivered</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </Select>
            <Button variant='contained' sx={{mt:2,ml:2}} onClick={handleStatusUpdate}>
                Save status
            </Button>
        </Box>
    </>
  )
}

export default OrderDetailsDialog