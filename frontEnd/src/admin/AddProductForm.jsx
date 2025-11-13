import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { addProductWithImage } from '../services/adminService';

const AddProductForm = ({onClose}) => {
    const [form, setForm] = useState({
        name:'',
        price:'',
        category:'',
        description:'',
        stock:''
    });
    const [image,setImage] = useState(null);

    const handleSubmit = async()=>{
        const formData = new FormData();//
        Object.entries(form).forEach(([key,val])=>formData.append(key, val));
        formData.append('imageFile', image);
        await addProductWithImage(formData);
        onClose();
    }

  return (
    <Box p={3}>
        <Typography variant='h6'>Add Product</Typography>
        <TextField label="Name" fullWidth margin='normal' onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <TextField label="Price" fullWidth margin="normal" type='number' onChange={(e)=>setForm({...form, price: e.target.value})}/>
        <TextField label="Category" fullWidth margin="normal" onChange={(e)=>setForm({...form, category: e.target.value})}/>
        <TextField label="Description" fullWidth margin="normal" multiline onChange={(e)=>setForm({...form, description: e.target.value})}/>
        <TextField label="Stock" fullWidth margin="normal" type='number' onChange={(e)=>setForm({...form, stock: e.target.value})}/>
        <Input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
        <Button variant='contained' sx={{mt:2}} onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default AddProductForm