import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

const OrderItem = ({item}) => {
  return (
    <ListItem alignItems='flex-start'>
        <ListItemAvatar>
            <Avatar
                variant='square'
                src={item.product.imageUrl}
                alt={item.productName}
                sx={{width:56,height:56,marginRight:2}}
            />
        </ListItemAvatar>
        <ListItemText 
            primary={item.product.name}
            secondary={
                <>
                    <Typography component="span" variant="body2" sx={{mr:1}}>Qty: {item.quantity}</Typography>
                    <Typography component="span" variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                </>
            }
        />
    </ListItem>
  )
}

export default OrderItem