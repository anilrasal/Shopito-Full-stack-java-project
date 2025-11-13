import { CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../../ProductCard'

const SearchResults = () => {
    const {searchResults,status,query, error} = useSelector(state=>state.search);

    if(status==='loading'){
        return (
            <Grid container justifyContent='center' sx={{mt:4}}>
                <CircularProgress/>
            </Grid>
        )
    }

    if(status==='failed'){
        return (
            <Typography variant='body1' color='error' sx={{mt:4,textAlign:'center'}}>
                {error||"Something went wrong while fetching the search results."}
            </Typography>
        )
    }

    if(!searchResults.length&&query.trim()){
        return (
            <Typography variant='body1' sx={{mt:4,textAlign:'center'}}>
                No products found for "<strong>{query}</strong>"
            </Typography>
        )
    }

    return(
        <Grid container display='flex' gap={3}>
            {searchResults.map(product=>(
                <Grid size={{xs:12,sm:6,md:3}} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default SearchResults