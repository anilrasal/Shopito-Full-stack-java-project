import { Box, Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'

const ProfuctDetailsSkeleton = () => {
  return (
    <Grid container spacing={4} display='flex'>
        {/*Left Image gallery Skeleton*/}
        <Grid size={{sx:12,md:5}} sx={{display:'flex'}}>
            <Box sx={{width:"100%", height:400, flexGrow:1}}>
                <Skeleton animation="waive" variant='rectangular' width='100%' height="100%"/>
            </Box>
        </Grid>   
        {/*Right: Product details skeleton*/} 
        <Grid size={{xs:12, md:7}}>
            <Box sx={{minHeight:400}}>
                <Stack spacing={2}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="rectangular" width="100%" height={50} />
                    <Skeleton variant="rectangular" width="100%" height={50} />
                </Stack>
            </Box>
        </Grid>
    </Grid>
  )
}

export default ProfuctDetailsSkeleton