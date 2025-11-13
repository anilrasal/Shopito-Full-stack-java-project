import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Skeleton, TextField, Typography } from '@mui/material'
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile} from '../services/userService';
import ChangePassword from '../components/profile/ChangePassword';

const ProfilePage = () => {
  const [loading, setloading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  });
  const [error, setError] = useState(null);
  const [user,setUser] = useState(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  useEffect(()=>{
    getProfile().then((res)=>{
      setUser(res.data);
      console.log(res.data);
      setloading(false);
    }).catch(err=>setError(err));
  },[]);

  const navigate = useNavigate();

  const handleSave = ()=>{
    updateProfile(form).then(res=>{
      setUser(res.data);
    }).catch(err=>{
      setError(error);
      console.log(error);
    });
    setOpenEdit(false);
  }

  const handleChange = (field)=>(e)=>{
    setForm((prev)=>({...prev, [field]:e.target.value}))
  }

  const openEditDialog=()=>{
    setForm({
      name:user?.name||"",
      email:user?.email||'',
      phoneNumber:user?.phoneNumber||'',
      address:user?.address||''
    })
    setOpenEdit(true);
  }

  const closeEditDialog=()=>{
    setOpenEdit(false);
  }
  return (
    <Box sx={{my:'auto',display:'flex', flexDirection:'column'}}>
        <Card elevation={3} sx={{maxWidth:900,mx:"auto"}}>
          <CardContent>
            {loading?
            (<Grid container spacing={2} sx={{alignItems:'center'}}>
              <Grid size={{xs:12, sm:4}} sx={{display:'flex', justifyContent:'center'}}>
                <Skeleton variant='circular' width={80} height={80}/>
              </Grid>
              <Grid size={{xs:12, sm:8}} sx={{border:'1px solid red'}}>
                <Skeleton width="40%" />
                <Skeleton width="60%" />
                <Skeleton width="30%" />
                <Skeleton width="30%" />
                <Skeleton variant='rectangular' width={240} height={40}/>
              </Grid>
            </Grid>)
            :
            (<Grid container spacing={2} alignItems="center">
              <Grid size={{xs:12, sm:4,md:4}} sx={{display:'flex', justifyContent:'center'}}>
                <Avatar
                  alt={user.name}
                  src='user.avtarUrl'
                  sx={{width:80,height:80}}
                />
              </Grid>
              <Grid size={{xs:12, sm:8, md:4}}>
                <Typography variant="h5">{user?.name}</Typography>
                <Typography color='text.secondary'>{user?.email}</Typography>
                <Typography variant='body2' sx={{mt:1}}>Role: {user?.role}</Typography>
                <Typography variant='body2' sx={{mt:1}}>Phone number: {user?.phoneNumber}</Typography>
                <Typography variant='body2'sx={{mt:1}}>Address: {user.address}</Typography>
              </Grid>
            </Grid>
          )}
            <Divider sx={{my:2}}/>

            {/* Profile Details */}
            <Box>
              <Typography variant='body1'>
                Orders:user.totalOrders
              </Typography>
            </Box>
            <Divider sx={{my:2}}/>

            {/* Actions */}
            <Box sx={{display:'flex', gap:1}}>
              <Button 
              variant='contained'
              startIcon={<EditIcon/>} 
              onClick={openEditDialog}
              sx={{textTransform:'none'}}
              color='primary'>
                Edit profile
              </Button>
              <Button variant='outlined'sx={{textTransform:'none'}} color='secondary' onClick={()=>setOpenPasswordDialog(true)}>
                Change Password 
              </Button>
              <Button variant='contained' sx={{textTransform:'none'}} color='error'>
                Delete Account
              </Button>
              <Button variant='outlined' sx={{textTransform:'none'}} color='primary' onClick={()=>navigate("/logout")}>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={openEdit} onClose={closeEditDialog} fullWidth maxWidth="sm"   disableRestoreFocus>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogContent dividers>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              margin='normal'
              helperText={!form.name&&"Enter Name"}
              onChange={handleChange("name")}
              name='name'
              error={!Boolean(form.name)}
            />
            <TextField
              label="Email"
              fullWidth
              margin='normal'
              helperText={!form.email&&"Email is required"}
              error={!form.email}
              name='email'
              value={form.email}
              onChange={handleChange("email")}
              type='email'
              
              disabled
            />
            <TextField
              label="Number"
              fullWidth
              margin='normal'
              type='tel'
              helperText={!form.phoneNumber&&"Phone number is required"}
              error={!form.phoneNumber}
              placeholder="+91 98765 43210"
              onChange={handleChange("phoneNumber")}
              value={form.phoneNumber}
              name='phoneNumber'
            />
            <TextField
              label="Address"
              fullWidth
              margin='normal'
              type='tel'  
              value={form.address}
              onChange={handleChange("address")}
              multiline
              minRows={2}
            />
          </DialogContent>
          <DialogActions>
            <Button color='error'variant='outlined' 
            onClick={closeEditDialog}
            >
              Cancel
            </Button>
            <Button
              color='success'
              variant='contained'
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Change password dialog */}

        <Dialog open={openPasswordDialog} onClose={()=>setOpenPasswordDialog(false)} fullWidth maxWidth="sm" disableRestoreFocus>
          <DialogTitle>
            Change Password
          </DialogTitle>
          <DialogContent dividers>
            <ChangePassword onClose={()=>setOpenPasswordDialog(false)}/>
          </DialogContent>
        </Dialog>
    </Box>
  )
}

export default ProfilePage