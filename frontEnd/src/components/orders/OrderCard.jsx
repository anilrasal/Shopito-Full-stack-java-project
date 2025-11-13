import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import OrderItemList from './OrderItemList'
import { getInvoiceByOrderId } from '../../services/orderService';

const OrderCard = ({order}) => {
   const totalAmount = order.orderItems.reduce((sum, item) => sum + item.price, 0);
   const items = order?.orderItems??[];
   const totalUnits=items.reduce((sum, item) => sum + item.quantity, 0);

   const handleDownload =async()=>{
    try {
      //Calls API to fetch the invoice PDF for the given order.
      const response = await getInvoiceByOrderId(order?.orderId);

      //created blog file as getting PDF as file from backend and browser doesn't know about it.
      //Wraps the binary data (response.data) into a Blob object. 
      // A Blob is a browser-native way to handle binary data like files.
      const blog = new Blob([response.data],{type:'application/pdf'});

      //Generates a temporary URL pointing to the Blob.
      //This URL is used as the href for the download link. It lives in memory and is revoked later to avoid leaks.
      const url = window.URL.createObjectURL(blog);

      //Creates an anchor (<a>) element dynamically.
      const link = document.createElement('a');

      //Sets the anchor’s href to the Blob URL.
      link.href = url;

      //Adds the anchor to the DOM temporarily.
      //Required for some browsers to allow the click to register.
      document.body.appendChild(link);

      //Simulates a user click on the anchor.
      link.click();

      //Cleans up the DOM by removing the anchor.
      document.body.remove(link);

      //Releases the memory used by the Blob URL.
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
   }
  return (
    <Card>
       <CardHeader
        title={`Order ID: #${order?.orderId}`}
        subheader={`Placed on: ${new Date(order?.orderDate).toLocaleDateString()}`}
       />
       <CardContent>
        <Typography>Status: {order.status}</Typography>
        <Typography>Total Amount: {`$${totalAmount}`}</Typography>
        <Typography>Items: {totalUnits}</Typography>
        <Button 
          variant='outlined' 
          size='small' 
          color='secondary'
          onClick={handleDownload}
          sx={{mt:1,mb:2,textTransform:'none'}}>
            Download invoice
        </Button>
        <OrderItemList items={order.orderItems} />
       </CardContent>
    </Card>
  )
}

export default OrderCard