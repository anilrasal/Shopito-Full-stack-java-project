import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../services/userService';
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();//store URL parms to searchParams array
    const token = searchParams.get('token');//read token from URL

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit=()=>{
        if(password===''||confirmPassword===''){
            setError("Enter password in both fields to proceed further");
            return;
        }
        if(password != confirmPassword){
            setError("Password do not match");
            return;
        }
        resetPassword({token, password}).then(res=>{
        setMessage(res.data);
        setError(null);
        setDisabled(true);
       }).catch(err=>{
        setError("Failed to reset Password. Token may be invalidated or expired. ", err);
        setMessage(null);
        setDisabled(true);
       })
    }

  return (
    <Box sx={{mx:'auto',mt:5}}>
        <Card elevation={3}>
            <CardContent>
                <Typography variant='h5' gutterBottom>Reset Password</Typography>
                <TextField 
                label="Password"
                fullWidth
                value={password}
                name = 'password'
                onChange={(e)=>setPassword(e.target.value)}
                type='password'
                margin='normal'
                required
                />
                <TextField 
                label="Password"
                fullWidth
                value={confirmPassword}
                name = 'password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
                type='password'
                margin='normal'
                required
                />
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    color='primary'
                    fullWidth   
                    sx={{mt:2}}
                    disabled={disabled}
                >
                    Change Password
                </Button>

                <Button
                    variant='contained'
                    onClick={()=>navigate("/forgot-password")}
                    color='primary'
                    fullWidth   
                    sx={{mt:2,mb:1}}
                    disabled={!disabled}
                >
                    Resend link
                </Button>
                 <Typography component={Link} to="/login">Back to login</Typography>
                {message&&<Alert severity='success'>{message}<Button onClick={()=>navigate("/login")}>Login</Button></Alert>}
                {error&&<Alert severity='error'>{error}</Alert>}
            </CardContent>
        </Card>
    </Box>
  )
}

export default ResetPassword