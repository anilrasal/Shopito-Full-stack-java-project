import { Box, Container, Grid, Rating, Typography,Button, Stack, IconButton, Tabs, Tab, Snackbar, Alert, CircularProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, addItem, addOrUpdateCartItem } from '../features/cart/cartSlice';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useEffect, useState } from 'react';
import ProductDetails from '../components/productDetails/ProductDetails';
import ProductImageGallery from '../components/productDetails/ProductImageGallery';
import TabPanel from '../components/productDetails/TabPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import { fetchProductById, selectProductById } from '../features/product/productSlice';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const ProductDetailsPage = () => {
  const {id} = useParams();//This is to take the parmeters from url and destructuring it.
  // const product = mockProducts.find((p)=>p.id===parseInt(id));

  //Select product from redux store
  const product = useSelector(selectProductById);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  
  const cartItem = useSelector(state=>state.cart.items.find(item=>item.id ===Number(id)));
  // Find cart item if already added to cart

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [tabValue,setTabValue]  = useState(0);

  const [notificationOpen, setNotificationOpen] = useState(false);


  useEffect(()=>{
    if(!product){
    dispatch(fetchProductById(id));
    // Calling async thunk in case if the product isn't available in the products slice redux
    }
    if(cartItem)
      setQuantity(cartItem.quantity);
  },[id,cartItem,dispatch]);// Calling async thunk in case if the product isn't available in the products slice redux

  const handleOnChange=(_,newValue)=>setTabValue(newValue);
  

  //Snackbar notification handlers
  const handleShowNotification = (_,reason) => {
    if(reason==="clickaway")
      return;
     setNotificationOpen(true);
  }

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  }
  return (
    <Container sx={{py:4}}>
      {status==='loading'?(<ProductCardSkeleton/>)
      :
      product?
        <Grid container spacing={4}>
          {error&&<Alert severity='error'>Got error while fetching the product. {error}</Alert>}

          {/* Left image gallary */}
          <Grid size={{xs:12,md:5}} sx={{display:'flex'}}>
            <Box sx={{flexGrow:1}}>
              <ErrorBoundary>
                <ProductImageGallery images={product.image}/>
              </ErrorBoundary>
            </Box>
          </Grid>

          {/*Right: Product details */}
          <Grid sx={{display:'flex', justifyContent:'center'}} size={{sx:12, md:7}} >
            <Box sx={{flexGrow:1,display:'flex',flexDirection:'column',gap:2}}>
              <ProductDetails 
                name={product.name}
                price={product.price}
                rating={product.rating}
                description={product.description}
                selectedCategory={product.selectedCategory}
                reviews='125'
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={()=>{
                  dispatch(addOrUpdateCartItem({
                    quantity:quantity,
                    productId:product.id,
                    userId:1 //Hardcoded userID for now
                  })).unwrap()
                  .then((res)=>console.log(res))
                  .catch((error)=>console.error("Error ocurred while adding the data to cart",error));
                  handleShowNotification();
                }
                }
                />
            </Box>
          </Grid>
        </Grid>:(<Typography variant='h6' color='error'>Product not found!</Typography>)}

        {/* Tabs */}
        <Box sx={{width:'100%',mt:4}}>
          <Tabs value={tabValue} onChange={handleOnChange} aria-label="specification and review tabs">
            <Tab label="Specification" />
            <Tab label="Review" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1">Display: 6.5", Processor: Snapdragon XYZ</Typography>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant="body1">"Great product! Totally worth it!" - User123</Typography>
          </TabPanel>
        </Box>

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
  )
}

export default ProductDetailsPage;