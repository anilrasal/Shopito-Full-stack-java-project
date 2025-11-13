import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import heroImage from "../assets/images/hero.jpg"
import { useEffect, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import Hero from '../components/hero/Hero';
import CategorySidebarFlex from '../components/category/CategorySidebarFlex'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, setCategory } from '../features/product/productSlice'
import { Pagination, Snackbar,Alert, Button } from '@mui/material'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

const HomePage = () => {

  const categories =['Electronics','Fashion','Home & kitchen','Beauty','Sports'];
  // const [selectedCategory, setSelectedCategory] = useState('');
  // const filteredProducts = selectedCategory?mockProducts.filter((p)=>p.category===selectedCategory):mockProducts;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [sortField, setSortField] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleShowNotification = () => {
    setNotificationOpen(true);
  }

  const handleCloseNotification = (_,reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setNotificationOpen(false);
  }

  const dispatch = useDispatch();
  const {items, status, error, totalPages, selectedCategory} = useSelector(
    state=>state.products
  )
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

  const [page, setPage] = useState(0);
  const size = 10; // or whatever page size you want  

  const handleSelectedCategory = (category) => {
      dispatch(setCategory(category));
      setPage(0);
      setDrawerOpen(false); // Close the drawer when a category is selected
  }

  const retryFetch=()=>{
    dispatch(fetchProducts({
    page,
    size,
    category: selectedCategory,
    sort: `${sortField},${sortDirection}`
  }));
  }
  
  useEffect(()=>{
      dispatch(fetchProducts({page,size,category:selectedCategory,sort:`${sortField},${sortDirection}`}));// e.g., "price,asc"
  },[page,size,selectedCategory, dispatch,sortField, sortDirection]);

  const filteredProducts = selectedCategory?items.filter((p)=>p.category?.split(',').map(c=>c.trim()).includes(selectedCategory)):items
  return (
    <>
    {/* Hero section */}
    <Hero heroImage={heroImage} />
    {/* Hero ended */}

    <Container sx={{ textAlign:'center',height:'100%',mb:10,justifyContent:"center"}} >

        <Grid container spacing={3} sx={{mt:6}}>
            {/* Catories: left side */}
            <Grid>
              <CategorySidebarFlex 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={handleSelectedCategory}//Passing setSelected category function to handle from CategorySidebar.jsx
              />
            </Grid>

            {/* Product grid */}
              {status==="loading"?
                <Grid container spacing={2}>
                  {[...Array(size)].map((_,i)=>(
                    <Grid size={{xs:12,sm:6, md:4}} key={i}>
                      {/* <Skeleton variant='rectangular' height={200}/> */}
                      <ProductCardSkeleton/>
                    </Grid>
                  ))}
                </Grid>:
                // if any error
                <Grid size={{sx:12,md:9}}>
                {error?<Alert severity='error' action={
                  <Button color="inherit" size="small" onClick={retryFetch}>
                    Retry
                  </Button>
                }>{error}</Alert>:
                <ProductGrid 
                  products={filteredProducts} 
                  selectedCategory={selectedCategory} 
                  page={page} size={size} 
                  totalPages={totalPages}
                  onSortChange={handleSortChange} // Pass the callback
                  onAddToCart={handleShowNotification}// Pass the callback
                />}

                {/* <SearchResults/> */}
                <Grid size={{xs:12}} sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={totalPages} // Replaced with actual total pages from Redux
                    page={page + 1} // MUI is 1-based, backend is 0-based
                    onChange={(event, value) => setPage(value - 1)}
                    color="secondary"
                  />
              </Grid>
            </Grid>}
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={notificationOpen}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          anchorOrigin={{vertical:'bottom', horizontal:'left'}}
        >
          <Alert onClose={handleCloseNotification} severity="success" sx={{width:'100%'}}>
            Item added to cart!
          </Alert>
        </Snackbar>

    </Container>
    </>
  )
}

export default HomePage