import React, { useState } from 'react'
import { loginUser } from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import loginImage from '../../assets/images/login/login_illusion.jpg'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const navigate=useNavigate();

    const [error,setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError('');
        setSuccess('');

        const {email,password} = formData;
        if(!email || !password){
            setError("Please enter both email and password");
            return; 
        }

        loginUser(formData).then((res)=>{
            setSuccess("Login successful! Redirecting to homepage....");
            localStorage.setItem("authToken",res.data.token);
            setError("");
            navigate("/");
        }).catch(err=>{
            if(err.response?.data?.message){
                setError(err.response.data.message);
            }else{
                setError("Invalid credentials. Please try again.");
            }
        })
    }
  return (
    <Card sx={{maxWidth:800,margin:'auto', boxShadow:3, borderRadius:2}}>
        <Grid container>
            {/* Left side */}
             <Grid size={{sx:12,md:6}}>
                <Box
                    sx={{
                        height:'100%',
                        display:{md:'flex',xs:'none'},
                        alignItems:'center',
                        justifyContent:'center',
                        p:2,
                    }}  
                >
                    <img src={loginImage} style={{maxWidth:'100%',borderRadius:'8px'}}/>
                </Box>
            </Grid>
            
            {/* Right side */}
            <Grid size={{xs:12,md:6}}>
                <Box component='form'
                    onSubmit={handleSubmit}
                    sx={{
                        p:4,
                        textAlign:'center',
                    }}
                >
                    <Typography variant='h5' mb={3} fontWeight={600}>
                        Login to Shopito
                    </Typography>

                    {error&&<Alert severity='error'sx={{mb:2}}>{error}</Alert>}
                    {success&&<Alert severity='success'sx={{mb:2}}>{success}</Alert>}

                    <TextField
                        fullWidth
                        margin='normal'
                        name='email'
                        type='email'
                        label="Email"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />

                    <TextField fullWidth
                        margin='normal'
                        name='password'
                        type='password'
                        label="Password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        sx={{mb:2}}
                    />
                    <Button variant='contained' type='submit' sx={{textTransform:'none',mb:2}} fullWidth>
                        Login
                    </Button>
                    <Stack direction='column'>
                    <Typography component={Link} to="/signup">
                        Don’t have an account? Signup
                    </Typography>
                    <Typography component={Link} to="/forgot-password">
                        Forgot Password
                    </Typography>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    </Card>
  )
}

export default LoginForm