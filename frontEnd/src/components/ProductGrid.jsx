import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard'
import Grid from '@mui/material/Grid'
import { useState } from 'react';

const ProductGrid = ({products,selectedCategory,page,size,totalPages,onSortChange,onAddToCart}) => {
  const [sortOption, setSortOption] = useState('price,asc');
  //const mdSize = productsPage ? 3 : 4; // Adjust md size based on productsPage prop

  const handleSelect = (e)=>{
    const [field, direction] = e.target.value.split(',');
    setSortOption(e.target.value);
    // Call the onSortChange callback with the selected field and direction
    onSortChange(field,direction);
  }
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{mb:3}}>
        <Box flexGrow={1}>
          {/* Heading */}
        <Typography variant='h5' gutterBottom sx={{mb:2}}>
          {selectedCategory? `Products in ${selectedCategory}`:'All Products'}
        </Typography>
        </Box>

        <Stack spacing={2} alignItems='center' direction={{xs:'column',md:'row'}}>
           {/* Sort Dropdown */}
           <FormControl size='small' sx={{minWidth:120}}>
            <InputLabel id='sort-label'>Sort By</InputLabel>
            <Select 
              value={sortOption}
              onChange={handleSelect}
              label='Sort By'
              labelId='sort-label'
            >
              <MenuItem value='price,asc'>Price: Low to High</MenuItem>
              <MenuItem value="price,desc">Price: High to Low</MenuItem>
              <MenuItem value="rating,desc">Rating: High to low</MenuItem>
              <MenuItem value="name,asc">Name: A to Z</MenuItem>
            </Select>
            </FormControl>

            {/* Page info */}
            <Typography variant='body2' color='textSecondary'>
              Page {page+1} of {totalPages}
            </Typography>
        </Stack>
      </Stack>

      {/* Product grid */}
        <Grid container spacing={3}>
        {(products.length>0)?products.map((product)=>(
            <Grid  size={{xs:12,sm:6, md:4}} key={product.id}>
                <ProductCard product={product} category={selectedCategory} onAddToCart={onAddToCart}/>
            </Grid>  
            )):<Grid size={12}>
                <Typography variant='body2' color='customButton'>Products are not available!</Typography>
              </Grid>
              }
        </Grid>
    </Box>
  )
}

export default ProductGrid