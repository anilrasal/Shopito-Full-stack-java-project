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

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
    }
    const handleSubmit = async()=>{
        const formData = new FormData();//
        Object.entries(form).forEach(([key,val])=>formData.append(key, val));
        if(image)
        formData.append('imageFile', image);

        try {
            await addProductWithImage(formData);
            for (let [key, val] of formData.entries()) {
                console.log(key, val);
            }
            onClose();
            setForm({ name: '', price: '', category: '', description: '', stock: '' });
            setImage(null);
        } catch (error) {
            console.error("Error while adding product: ", error);
        }
    }

  return (
    <Box p={3}>
        <Typography variant='h6'>Add Product</Typography>
        <TextField autoFocus label="Name" value={form.name} fullWidth margin='normal' onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <TextField label="Price" value={form.price} fullWidth margin="normal" type='number' onChange={(e)=>setForm({...form, price: e.target.value})}/>
        <TextField label="Category" value={form.category} fullWidth margin="normal" onChange={(e)=>setForm({...form, category: e.target.value})}/>
        <TextField label="Description" value={form.description} fullWidth margin="normal" multiline onChange={(e)=>setForm({...form, description: e.target.value})}/>
        <TextField label="Stock" value={form.stock} fullWidth margin="normal" type='number' onChange={(e)=>setForm({...form, stock: e.target.value})}/>
        {/* Styled file upload */}
        <Button variant='outlined' component="label" sx={{ mt: 2 }}>
            Upload image
            <input type='file' hidden onChange={handleImageChange}/>
        </Button>
        {image && <Typography variant="body2" sx={{ mt: 1 }}>Selected: {image.name}</Typography>}
        
        <Button variant='contained' sx={{mt:2}} onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}

export default AddProductForm