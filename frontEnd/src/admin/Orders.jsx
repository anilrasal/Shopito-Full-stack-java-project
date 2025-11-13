import { Box, Dialog, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAdminOrders } from '../services/orderService';
import OrderDetailsDialog from './OrderDetailsDialog';

const Orders = () => {
  const [orders,setOrders] = useState([]);
  const [page,setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async()=>{
    try {
      const response = await getAdminOrders({page, rowsPerPage,status:statusFilter});
      setOrders(response.data.content);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      alert("Failed to fetch orders.", error);
    }
  }

  useEffect(()=>{
    fetchOrders();
  },[page,rowsPerPage,statusFilter]);

  return (
    (orders.length===0)?
      <Box>
        <Typography variant='h5' gutterBottom>
            View and Manage Orders
            </Typography>
        <Typography>No orders yet</Typography>
      </Box>:
      <>
        <Typography variant='h5' gutterBottom>
            View and Manage Orders
        </Typography>

        <Select
          value={statusFilter}
          onChange={(e)=>{
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          displayEmpty
          sx={{mb:2,minWidth:200}}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="PLACED">Pending</MenuItem>
          <MenuItem value="SHIPPED">Shipped</MenuItem>
          <MenuItem value="DELIVERED">Delivered</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
        </Select>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order)=>(
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>
                <IconButton onClick={()=>{
                   document.activeElement?.blur();// This is to blur the active element
                  setSelectedOrder(order.id)
                  }}>
                  <VisibilityIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component='div'
          count={totalItems}
          page={page}
          onChange={(e, newPage)=>setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e)=>{
            setRowsPerPage(parseInt(e.target.value,10));
            setPage(0);
          }}
        />
        <Dialog open={!!selectedOrder} onClose={()=>setSelectedOrder(null)}>
          <OrderDetailsDialog orderId={selectedOrder} onClose={()=>{
            setSelectedOrder(null);
            fetchOrders();
          }}/>
        </Dialog>
    </>
  )
}

export default Orders