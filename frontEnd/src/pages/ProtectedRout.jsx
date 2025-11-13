import React, { useEffect, useState } from 'react'
import { getProfile } from '../services/userService';
import { Navigate } from 'react-router-dom';

const ProtectedRout = ({children, allowedRoles}) => {
    const [role, setRole]=useState(null); //null= not loaded yet
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getProfile().then(res=>{
            setRole(res.data.role);
            setLoading(false);
        }).catch(err=>{
            console.error("Error fetching profile:", err);
            setLoading(false);
          })
    },[]);
    if (loading) return null; // or a spinner
  return (
    allowedRoles.includes(role)?children:
    <Navigate to="/admin/unauthorized"/>
  )
}

export default ProtectedRout