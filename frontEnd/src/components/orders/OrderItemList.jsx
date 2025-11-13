import { List } from '@mui/material'
import React from 'react'
import OrderItem from './OrderItem'

const OrderItemList = ({items}) => {
  return (
    <List>
        {items.map((item,index)=>(
            <OrderItem key={index} item={item} />
        ))}
    </List>
  )
}

export default OrderItemList