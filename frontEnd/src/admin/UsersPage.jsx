import { Box, Button, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { deleteUser, getAdminUsers, updateUserRole } from '../services/adminService';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [rowsPerPage,setRowsPerPage]=useState(10);

    useEffect(()=>{
        refreshUsers();
    },[page,rowsPerPage]);

    const handleRoleChange = (userId, newRole)=>{
        updateUserRole(userId,newRole).then(()=>refreshUsers());
        alert("User role updated successfully"); 
    }
    
    const handleDelete = (userId)=>{
        deleteUser(userId).then(()=>refreshUsers());
    }

    const refreshUsers=()=>{
        getAdminUsers({page, rowsPerPage})
        .then(res=>{
            setUsers(res.data.content);
            setTotalPages(res.data.totalPages);
        })
    }
  return (
    <Box>
        <Typography variant='h5' gutterBottom>
            Manage users
        </Typography>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user=>(
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Select
                                    value={user.role}
                                    onChange={(e)=>handleRoleChange(user.id,e.target.value)}
                                    disabled={user.role==='ADMIN'&&users.filter(u=>u.role==='ADMIN').length<=1}
                                >
                                    <MenuItem value="USER">USER</MenuItem>
                                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align='center'>
                                <Button
                                    variant='outlined'
                                    color='error'
                                    onClick={()=>handleDelete(user.id)}
                                    disabled={user.role==='ADMIN'&&users.filter(u=>u.role==='ADMIN').length<=1}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <TablePagination 
            component='div'
            count={totalPages}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e)=>{
                setRowsPerPage(e.target.value,10);
                setPage(0);
            }}
            onChange={(e,newPage)=>setPage(newPage)}
        />
    </Box>
  )
}

export default UsersPage