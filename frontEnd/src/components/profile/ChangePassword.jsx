import React, { use, useState } from 'react'
import { changePassword } from '../../services/userService';
import { Alert, Box, Button, CircularProgress, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ChangePassword = () => {
    const [form, setForm] = useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
    });

    const [showPassword, setShowPassword] = useState({
        current:false,
        new:false,
        confirm:false
    }); // this is for 3 text fields
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false); 
    const [isLoading,setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value});
    };

    const validate=()=>{
        const newErrors={};
       if(!form.currentPassword) newErrors.currentPassword= "Current password is required";
       if(form.newPassword.length<6) newErrors.newPassword=  "New password must be at least 6 characters";
       if(form.newPassword!== form.confirmPassword) newErrors.confirmPassword=  "Password do not match";
       return newErrors;
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const validateError = validate();
        if(Object.keys(validateError).length>0){
            setErrors(validateError);
            setIsLoading(false);
            return;
        }
        setErrors({});

        await changePassword({currentPassword:form.currentPassword,newPassword:form.newPassword}).then((res)=>{
            setSuccess(true);
            setForm({currentPassword:"",newPassword:"",confirmPassword:""});
            setErrors({});
            //localStorage.removeItem("authToken");
        }).catch(err=>{
            setErrorMessage(err.response?.data?.message||"Password change failed");
            console.log(err.response.message);
        }).finally(()=>setIsLoading(false));
            
    }
  return (
    <Box component='form' onSubmit={handleSubmit} sx={{maxWidth:400,mx:'auto'}}>
        <TextField
            label="Current Password"
            type={showPassword.current?"text":"password"}
            name='currentPassword'
            onChange={handleChange}
            value={form.currentPassword}
            helperText={errors.currentPassword}            
            fullWidth
            error={!!errors.currentPassword}
            margin='normal'
            slotProps={{
                input:{
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={()=>
                                    setShowPassword((prev)=>({...prev, current:!prev.current}))
                                }
                            >
                                {showPassword.current?<VisibilityIcon/>:<VisibilityOffIcon/>    }
                            </IconButton>
                        </InputAdornment>
                    ) 
                }
            }}
        />
        <TextField
            label="New Password"
            value={form.newPassword}
            fullWidth
            type={showPassword.new?"text":"password"}
            margin='normal'
            onChange={handleChange}
            name='newPassword'
            helperText={errors.newPassword}
            error={!!errors.newPassword}
            slotProps={{
                input:{
                    endAdornment:(
                        <InputAdornment position='end'>
                            <IconButton 
                                onClick={()=>{
                                    setShowPassword((prev)=>({...prev, new:!prev.new}));
                                }}>
                                {showPassword.new?<VisibilityIcon/>:<VisibilityOffIcon/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
        <TextField
            label="Confirm password"
            fullWidth
            margin='normal'
            type={showPassword.confirm?"text":"password"}
            value={form.confirmPassword}
            name='confirmPassword'
            onChange={handleChange}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            slotProps={{
                input:{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={()=>setShowPassword((prev)=>({...prev, confirm:!prev.confirm}))}
                            >
                                {showPassword.confirm?<VisibilityIcon/>:<VisibilityOffIcon/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}

        />
        <Button type='submit' fullWidth sx={{textTransform:'none',my:3}} variant='contained' disabled={isLoading} startIcon={isLoading&&<CircularProgress/>}>Change Password</Button>
        {errorMessage&&(
            <Snackbar open autoHideDuration={4000} onClose={()=>setErrors("")}>
                <Alert severity='error'>{errorMessage}</Alert>
            </Snackbar>
        )}
        {success&&(
            <Snackbar open autoHideDuration={4000} onClose={()=>setSuccess(false)}>
                <Alert severity='success'>Password changed successfully</Alert>
            </Snackbar>
        )}
    </Box>
  )
}

export default ChangePassword