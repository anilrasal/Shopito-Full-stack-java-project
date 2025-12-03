import { Box, Button, Dialog, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAdminProducts,deleteProduct } from '../services/adminService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  // const [size, setSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [openAdd, setOpenAdd] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [openError, setOpenError] = useState(false);

  const fetchProducts = async()=>{
    try {
      const response = await getAdminProducts({page, rowsPerPage,selectedCategory});
      console.log(response.data.content);
      setProducts(response.data.content);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      setErrorMsg("Got error while fetching the products: "+ error.response.data.message);
      setOpenError(true);
    }
    
  }

  useEffect(()=>{
    fetchProducts();
  },[page,rowsPerPage, selectedCategory]);

  const handleDelete=async(id)=>{
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      setOpenError(true);
      setErrorMsg("Error occured while deleting: "+ error.response.data.message);
    }
    
  }

  return (
    <Box>
        <Typography variant='h5'gutterBottom>
            Manage products
        </Typography>
        <Button variant='contained' color='secondary' onClick={()=>setOpenAdd(true)}>
            Add New product
        </Button>
        {/* Later: Add DataGrid for listing */}

        <Box>
          <FormControl sx={{ minWidth: 200, mb: 2,mt:2 }}>
            <InputLabel>Filter by category</InputLabel>
            <Select
              value={selectedCategory}
              label="Filter By Category"
              onChange={(e)=>{
                setSelectedCategory(e.target.value);
                setPage(0);//reset pagination
              }}
            >
              <MenuItem value="">
                All
              </MenuItem>
              <MenuItem value="Electronics">
                Electronics
              </MenuItem>
              <MenuItem value="Fashion">
                Fashion
              </MenuItem>
              <MenuItem value="Home & Kitchen">
                Home & Kitchen
              </MenuItem>
               <MenuItem value="Beauty">
                Beauty
              </MenuItem>
               <MenuItem value="Sports">
                Sports
              </MenuItem>
            </Select>
          </FormControl>
          <Paper sx={{mt:2}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((prod)=>(
                  <TableRow key={prod.id}>
                    <TableCell>{prod.name}</TableCell>
                    <TableCell>{prod.price}</TableCell>
                    <TableCell>{prod.availableStock}</TableCell>
                    <TableCell>{prod.category}</TableCell>
                    <TableCell>{prod.active ?'Active':'Inactive'}</TableCell>
                    <TableCell>
                      <IconButton onClick={()=>setEditProduct(prod)}>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={()=>handleDelete(prod.id)}>
                        <DeleteIcon color="error"/>
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
              onPageChange={(e, newPage)=>setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e)=>{
                setRowsPerPage(parseInt(e.target.value,10));
                setPage(0);
              }}
            />
          </Paper>

          <Dialog open={openAdd} onClose={()=>setOpenAdd(false)}>
              <AddProductForm onClose={()=>{setOpenAdd(false);fetchProducts();}}/>
          </Dialog>

          <Dialog open={!!editProduct} onClose={()=>setEditProduct(null)}>
            <EditProductForm product={editProduct} onClose={()=>{setEditProduct(null);fetchProducts();}}/>
          </Dialog>
          <Snackbar
            open={openError}
            autoHideDuration={4000}
            onClose={()=>setOpenError(false)}
            message={errorMsg}
          />
        </Box>
    </Box>
  )
}

export default Products