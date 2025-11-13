import React, { useState } from 'react'
import { requestPasswordReset } from '../services/userService';
import { Alert, Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async()=>{
        setLoading(true);
        if(email===''){
            setError("Enter email address");
            setLoading(false);
            return;
        }else{
        requestPasswordReset(email).then(res=>{
            setMessage(res.data);
            setError(null);
        }).catch(err=>{
            setError(err);
            setMessage(null);
        }).finally(()=>{
            setLoading(false);
        })
    }
    }
  return (

    <Box sx={{maxWidth:400, mx:'auto', mt:5}}>
        <Card elevation={3}>
            <CardContent>
                <Typography variant='h5' gutterBottom>
                    Forgot Password
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{mb:2}}>
                    Enter your registered email address. We’ll send you a link to reset your password.
                </Typography>
                <TextField
                    value={email}
                    type='email'
                    label="Email"
                    fullWidth
                    onChange={(e)=>setEmail(e.target.value)}
                    margin='normal'
                    required
                />
                <Button 
                    variant='contained'
                    onClick={handleSubmit}
                    color='primary'
                    fullWidth   
                    sx={{mt:2,mb:2}}
                >
                    Send Reset Link
                </Button>
                <Typography component={Link} to="/login">Back to login</Typography>
                {message&&<Alert severity='success' sx={{ mt: 2 }}>{message}</Alert>}
                {error&&<Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>}
                {loading&&<CircularProgress />}
            </CardContent>
        </Card>
    </Box>
  )
}

export default ForgotPasswordPage