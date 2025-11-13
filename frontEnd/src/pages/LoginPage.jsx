import { Alert, Box, Button, Card, CardContent, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChane =(e)=>{
    setFormdata({
      ...formdata,
      [e.target.name]:e.target.value
    });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(formdata);
      const token = response.data.token;
      localStorage.setItem('authToken',token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }

  }
  return (
    <LoginForm/>
    // <Card
    //   component='form'
    //   onSubmit={handleSubmit}
    //   sx={{
    //     maxWidth: 400,
    //     margin: 'auto',
    //     my: 'auto',
    //     p: 4,
    //     boxShadow: 3,
        
    //     textAlign: 'center',
    //     backgroundColor:'inherit'
    //   }}
    // >
    //   <CardContent sx={{textAlign:'center'}}>
    //     {error&&<Alert severity='error' sx={{mb:2}}>{error}</Alert>}

    //   <Typography variant="h5" mb={3} fontWeight={600}>
    //     Login to Shopito
    //   </Typography>

    //   <TextField
    //     fullWidth
    //     value={formdata.email}
    //     name="email"
    //     onChange={(e)=>handleChane(e)}
    //     label="Email"
    //     variant="outlined"
    //     required
    //     sx={{ mb: 2 }}
    //   />

    //   <TextField
    //     fullWidth
    //     name='password'
    //     value={formdata.password}
    //     onChange={(e)=>handleChane(e)}
    //     label="Password"
    //     type="password"
    //     variant="outlined"
    //     required
    //     sx={{ mb: 3 }}
    //   />

    //   <Button
    //     variant="contained"
    //     color="primary"
    //     fullWidth
    //     type='submit'
    //     sx={{
    //       fontWeight: 'bold',
    //       textTransform: 'none',
    //       '&:hover': {
    //         backgroundColor: 'primary.dark',
    //       },
    //       mb:2,
    //     }}
    //   >
    //     Login
    //   </Button>
    //   <Stack>
    //   <Typography component={Link} to={"/signup"} gutterBottom>
    //     Don't have an account?
    //   </Typography>
    //   <Typography component={Link} to={"/forgot-password"}>
    //     Forgot password?
    //   </Typography>
    //   </Stack>
    //   </CardContent>
    // </Card>
  );
};

export default LoginPage;
