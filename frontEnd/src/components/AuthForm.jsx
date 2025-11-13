import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const AuthForm = ({title,fields, buttonText,onSubmit}) => {
  return (
    <Box 
        component='form'
        onSubmit={onSubmit}
        sx={{
            maxWidth:400,
            margin:'auto',
            mt:8,
            p:4,
            textAlign:'center',
            boxShadow:3,
            borderRadius:2
        }}
    >
        <Typography variant='h5' mb={3} fontWeight={600}>
            {title}
        </Typography>
        {fields.map(({label,type}, idx)=>(
            <TextField
                variant='outlined'
                fullWidth
                label={label}
                type={type}
                sx={{
                    mb:2,
                }}
                required
            />
        ))}
        <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'primary.dark',
            },
            }}
        >
            {buttonText}
        </Button>
    </Box>
  )
}

export default AuthForm