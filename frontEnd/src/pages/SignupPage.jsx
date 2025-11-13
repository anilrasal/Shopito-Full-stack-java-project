import React, { useState } from 'react'
import { Alert, Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import { registerUser } from '../services/userService';
import signUpImage from '../assets/images/login/login_illusion.jpg';

const SignupPage = () => {
  const [formdata, setFormdata] = useState({
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    //Basic front end validation
    const {email, name, phoneNumber, password} = formdata;
    if(!email || !name || !phoneNumber || !password){
      setError('Please fill all required fields');
      return;
    }

    registerUser(formdata)
      .then((response) => {
        console.log(response);
        setSuccess('Signup successful! You can now login.');
        setFormdata({
          email: '',
          name: '',
          address: '',
          phoneNumber: '',
          password: ''
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred during signup. Please try again.');
        }
      });


  }
  return (
    <Card 
      sx={{
            maxWidth:800,
            margin:'auto',
            textAlign:'center',
            boxShadow:3,
            maxHeight:"90vh",
            overflowY: 'auto',
            borderRadius:2
        }}
    >
      <Grid container>
        {/* Left side */}
        <Grid size={{sx:12,md:6}}>
          <Box sx={{
            height:'100%',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            p:2
          }}>
            <img src={signUpImage} alt='Signup Illustration' style={{maxWidth:"100%",borderRadius:'8px',objectFit:'cover'}}/>  
          </Box>
        </Grid>

        {/* Right */}
        <Grid size={{sx:12,md:6}}>
          <Box component='form' onSubmit={handleSubmit} sx={{p:4, textAlign:'center'}}>
            <Typography variant='h5' mb={3} fontWeight={600}>
              Signup to Shopito
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Grid container spacing={1} sx={{justifyContent:'center'}}>
              <Grid size={{sx:12,md:6}}>
                <TextField variant='outlined' onChange={handleChange} value={formdata.email} name='email' label="email" type='email' fullWidth sx={{mb:2}} required/>
              </Grid>
              <Grid size={{sx:12,md:6}}>
                <TextField variant='outlined' onChange={handleChange} value={formdata.name} name='name' label="Name" fullWidth sx={{mb:2}} required/>
              </Grid>
              <Grid size={{sx:12,md:6}}>
                <TextField variant='outlined' onChange={handleChange} value={formdata.address} name='address' label="Address" fullWidth sx={{mb:2}}/>
              </Grid>
              <Grid size={{sx:12,md:6}}>
                <TextField variant='outlined' onChange={handleChange} value={formdata.phoneNumber} name='phoneNumber' label="Phone number" fullWidth sx={{mb:2}} type='tel' required/>
              </Grid>
              <Grid size={{sx:12,md:12}}>
                <TextField variant='outlined' onChange={handleChange} value={formdata.password} name='password' label="Password" fullWidth sx={{mb:3}} type='password' required/>
              </Grid>
            </Grid>
            <Button variant="contained"
            color="primary"
            type='submit'
            fullWidth
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              mb:2,
            }}>
                Signup
            </Button>
            <Typography component={Link} to="/login">
                Already have an account?
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default SignupPage