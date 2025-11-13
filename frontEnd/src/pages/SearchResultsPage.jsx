import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../features/product/productSlice';
import SearchResults from '../components/navbar/searchBar/SearchResults';
import { fetchSearchResults } from '../components/navbar/searchBar/searchThunks';

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const [params] = useSearchParams();// /search?q=phone
  // Extract the search query from URL parameters
    const query = params.get('q') || '';

    // Get search results, loading status, and error from Redux store
    const {searchResults, loading, error} = useSelector(state=> state.search);

    useEffect(()=>{
        // Dispatch an action to fetch products based on the search query
        // Assuming fetchProducts is an action that fetches products based on a query
        if(query.trim()){
            dispatch(fetchSearchResults(query));
        }
    },[query, dispatch]);

  return (
    <Box sx={{p:2}}>
        <Typography variant='h5' gutterBottom>
            Search Results for: <strong>"{query}"</strong> 
        </Typography>
        {loading&&(
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'50vh'}}>
                <CircularProgress color='customOrange' size={50}/>
            </Box>
        )}

        {error&&(
            <Typography color="error">
                Something went wrong: {error}
            </Typography>
        )}

        {!loading && !error && searchResults.length> 0 && (
            <SearchResults products={searchResults} />
        )}
    </Box>
    
  )
}

export default SearchResultsPage