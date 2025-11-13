import { Grid,Container, CircularProgress, Alert, Pagination } from "@mui/material"
import CategorySidebar from "../components/CategorySidebar";
import mockProducts from "../data/MockProducts"
import ProductGrid from "../components/ProductGrid";
import { useEffect, useState } from "react";
import {getAllProducts} from '../services/productService';
import CategorySidebarFlex from "../components/category/CategorySidebarFlex";
import productMapper from "../mapper/mapApiToUi.js"
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategory } from '../features/product/productSlice.js'

const ProductsPage = () => {

    const categories =['Electronics','Fashion','Home & kitchen','Beauty','Sports'];
    // const [products, setProducts] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const {items,status, error,totalPages, selectedCategory} = useSelector(
      state =>state.products
    )

    const [sortField, setSortField] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc

    const [page, setPage] = useState(0);
    const size = 10; // or whatever page size you want 

    const handleSortChange = (field, direction) => {
      setSortField(field);
      setSortDirection(direction);
      setPage(0); // Reset to first page when sorting changes
      dispatch(fetchProducts({
        page,
        size,
        category,
        sort: `${field},${direction}`
      }));
    }

    useEffect(()=>{
      //dispatch(fetchProducts({page, size, category:selectedCategory, sort:`${sortField},${sortDirection}`}));// e.g., "price,asc"
      dispatch(fetchProducts({page, size, category:selectedCategory, sort:`${sortField},${sortDirection}`}));// e.g., "price,asc"
    },[page, size,dispatch,sortField,selectedCategory, sortDirection]);

    //Filter logic
    // const filteredProducts = selectedCategory?products.filter((p)=>p.category===selectedCategory):products;
    const filteredProducts = selectedCategory?items.filter((p)=>p.category.split(",").map(c=>c.trim()).includes(selectedCategory)):items;

    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const handleCategorySelect = (category) => {
      dispatch(setCategory(category));
      setPage(0);
      setDrawerOpen(false); // Close the drawer when a category is selected
    }

  return (
    <>
    <Container sx={{ textAlign:'center',height:'100%',mb:10}}>
      {status==='loading'&&<CircularProgress sx={{mt:4}}/>}
      {status==="failed"&&<Alert severity="error" sx={{mt:4}}>{error}</Alert>}
        {/* Categories section */}

        {status==="succeeded"&&(
        <Grid container spacing={3} sx={{mt:6}}>
          {/* Categories: left side */}
          <Grid>
            <CategorySidebarFlex
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={handleCategorySelect} // Passing setSelected category function to handle from CategorySidebar.jsx
            />
          </Grid>

          <Grid size={{xs:12,md:9}}>
            <ProductGrid 
              products={filteredProducts} 
              selectedCategory={selectedCategory} 
              page={page} 
              totalPages={totalPages} 
              size={size}
              onSortChange={handleSortChange} // Pass the callback
            />
            <Grid size={{xs:12}} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages} // Replaced with actual total pages from Redux
                page={page + 1} // MUI is 1-based, backend is 0-based
                onChange={(event, value) => setPage(value - 1)}
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
        )}
    </Container>
    </>
  )
}

export default ProductsPage