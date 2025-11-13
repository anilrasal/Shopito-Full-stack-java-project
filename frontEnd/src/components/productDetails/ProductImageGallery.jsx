import { Box } from '@mui/material'
import React from 'react'
import ReactImageGallery from 'react-image-gallery'

const ProductImageGallery = ({images}) => {
  return (
    <Box flexGrow={1}
        sx={{
            maxWidth:"600px",
            height: "100%", /* fixed height for consistency */
            mx: 'auto',
            '& .image-gallery-slide img':{
              width: '100%',
              height: '100%',
              objectFit: 'cover' // ensures image fills without distortion
            },
            '& .image-gallery-content':{
              height: '100%'
            },
        }}
    >
        <ReactImageGallery 
            items={images}
            showThumbnails={true}
            thumbnailPosition="left"
            showPlayButton={false}
            showFullscreenButton={true}
            slideOnThumbnailOver={false}
            autoPlay={false}
            renderLeftNav={() => null}//Disable left arrow
            renderRightNav={() => null}//disable right arrow
        />
    </Box>
  )
}

export default ProductImageGallery