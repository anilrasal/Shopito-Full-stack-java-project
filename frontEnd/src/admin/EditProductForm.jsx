import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, Input, Select, MenuItem, Grid
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';

const EditProductForm = ({product}) => {
  const productId = product?.id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock:'',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try{
      const res = await getProductById(productId);
      const { name, description, price, inventory,category, imageUrl } = res.data;
      console.log("The stock is: ",inventory);
      console.log(res.data);
      setForm({ name, description, price, category,stock:inventory });
      setPreview(imageUrl);
      }catch(err){
        console.error("Failed to fetch product: ", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('imageFile', image);
    await updateProduct(productId, formData);
    alert('Product updated successfully');
    navigate('/admin/products');
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Edit Product</Typography>
      <Grid container spacing={2}>
        <Grid size={{xs:12,sm:4}}>
          <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />
          <Input type="file" onChange={handleImageChange} sx={{ mt: 2 }} />
        </Grid>
        <Grid size={{xs:12,sm:8}}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={form.description}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={form.price}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            margin="normal"
            value={form.stock}
            onChange={handleChange}
          />
          <Select
            label="Category"
            name="category"
            fullWidth
            value={form.category}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
            <MenuItem value="Beauty">Beauty</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            {/* Add more categories as needed */}
          </Select>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProductForm;
