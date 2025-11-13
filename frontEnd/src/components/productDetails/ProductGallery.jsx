import { ImageList, ImageListItem } from '@mui/material'
import React from 'react'

const ProductGallery = ({images}) => {
  return (
        <ImageList cols={1} rowHeight={300} sx={{maxWidth:400}}>
            {images.map((image,index)=>(
                <ImageListItem key={index}>
                    <img
                        src={`${image.original}?w=300&h=300&fit=crop&auto=format`}
                        alt={`Product ${index+1}`}
                        style={{width:'100%',height:"100%",objectFit:'cover'}}
                    />
                </ImageListItem>
            ))
            }
        </ImageList>
  )
}

export default ProductGallery