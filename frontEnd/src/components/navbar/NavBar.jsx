import { AppBar, Avatar, Badge, Box, Button, Container, IconButton, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ThemeToggle from './ThemeToggle';
import SearchBar from './searchBar/SearchBar';
import SearchInput from './searchBar/SearchInput';
import { fetchCartItems, fetchCartItemsWithAuth } from '../../features/cart/cartSlice';
import { getProfile } from '../../services/userService';

const pages = [
    {
        id:'home',
        label:'Home',
        path:"/"
    },
    {
        id:'products',
        label: 'Products',
        path:"/products"
    },
    {
        id:'admin',
        label: 'Admin Panel',
        path:"/admin"
    }
];
const settings = [
    {
        id:'profile',
        label:'Profile',
        path:"/profile"
    },
    {
        id:'account',
        label:'Account',
        path:'/account'
    },
    {
        id:'dashboard',
        label: 'Dashboard',
        path:"/dashboard"
    },
    {
        id:'myOrders',
        label:'My Orders',
        path:"/orders"
    },
    {
        id:'logout',
        label:'Logout',
        path:"/logout"
    },
    ];
const NavBar = ({mode, setMode}) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const cartCount = useSelector((state)=>state.cart.totalQuantity);
    const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
    const [userRole, setUserRole] = useState(null);

    const isAuthenticated = !!localStorage.getItem("authToken");

    const dispatch = useDispatch();
    useEffect(()=>{
        if(isAuthenticated){
            dispatch(fetchCartItemsWithAuth());
            getProfile().then(res=>{
                setUserRole(res.data.role);
            });
        }
    })

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <Box>
        <AppBar 
        position='sticky' 
        elevation={trigger?4:0}
        sx={{backgroundColor:theme.palette.background.paper, 
        color:"inherit"}}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography 
                        variant='h6'
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr:2,
                            display:{xs:'none', md:'flex'},
                            color:'inherit',
                            fontWeight:700,
                            fontFamily:"monospace",
                            textDecoration:"none",
                            letterSpacing: '.2rem',
                        }}
                    >
                        Shopito
                    </Typography>
                    {/* small screens view which is hidden when screen size increases */}
                    <Box sx={{flexGrow:1, display:{xs:'flex',md:'none'},alignItems:'center'}}>
                        <IconButton
                            size='large'
                            aria-label='online shopping'
                            aria-controls='menu-appbar'
                            aria-haspopup="true"
                            color='inherit'
                            onClick={handleOpenNavMenu}
                        >   
                            <MenuIcon/>
                        </IconButton>
                        {anchorElNav&&<Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                            {pages.filter(page=>page.id!=="admin" || userRole==="ADMIN")
                            .map((page) => (
                                <MenuItem component={NavLink}to={page.path} key={page.id} onClick={handleCloseNavMenu}>
                                <Typography sx={{ textAlign: 'center',textDecoration:'none',color:'inherit' }}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>}
                        <Typography 
                        variant='h6'
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr:2,
                            display:{xs:'flex', md:'none'},
                            color:'inherit',
                            fontWeight:700,
                            fontFamily:"monospace",
                            textDecoration:"none",
                            letterSpacing: '.2rem',
                        }}
                    >
                        Shopito
                    </Typography>
                    </Box>
                    
                    {/* Large screen menu(desktop view) */}
                    <Box sx={{flexGrow:0,display:{xs:"none", md:"flex",alignItems:'center'}}}>
                        <Box sx={{display:'flex',gap:2}}>
                        {pages.filter(page=>page.id!=="admin" || userRole==="ADMIN")
                        .map((page)=>(
                            <Button 
                                key={page.id}
                                component={NavLink}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{ 
                                    my: 2, 
                                    color: 'inherit', 
                                    fontFamily:'monospace', 
                                    display: 'block',
                                    '&.active':{
                                        fontWeight:'bold', 
                                        borderBottom:'1px solid red'
                                    },
                                    textTransform: 'none', // disables uppercase styling
                                    size:"large"
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                        </Box>
                    </Box>

                    {/* Centered search */}
                    <Box sx={{flexGrow:1,mx:3, display:{xs:'none',sm:'flex'},justifyContent:'center'}}>
                        {/* <SearchBar/> */}
                        <SearchInput/>
                    </Box>

                    {/* Right side conditional Menu, user */}
                    
                    {isAuthenticated&&<Box sx={{flexGrow:0}}>
                        <ThemeToggle mode={mode} setMode={setMode}/>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt='user name' src='Will add this later'/>
                            </IconButton>
                        </Tooltip>
                        {anchorElUser&&<Menu
                            sx={{mt:'45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                
                                vertical:"top",
                                horizontal:'right'
                            }}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting)=>(
                                <MenuItem key={setting.id} onClose={handleCloseUserMenu}>
                                    <Typography onClick={handleCloseUserMenu} component={Link} to={setting.path} sx={{textAlign:'center',textDecoration:'none', color:'inherit'}}>
                                        {setting.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>}
                    </Box>}

                    {/* Cart */}
                    <Box sx={{flexGrow:0}}>
                        {isAuthenticated?<IconButton color='inherit' onClick={()=>navigate("/cart")}>
                            <Badge badgeContent={cartCount} color='secondary'>
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                        :<Box gap={1} sx={{display:'flex'}}>
                            <Button 
                                variant='text'
                                sx={{
                                    textTransform:'none'
                                }}
                                color='customGreen'
                                onClick={()=>navigate("/signup")}
                            >
                                Signup
                            </Button>
                            <Button 
                                sx={{
                                    color:'white',
                                    fontFamily:'monospace',
                                    textTransform:'none',
                                    borderRadius:"75px",
                                    backgroundColor:"black",
                                    fontWeight:1000,
                                    '&:hover':{
                                        backgroundColor:"gray",
                                        color:'inherit'
                                    }
                                    }}
                                onClick={()=>navigate("/login")}
                            >
                                Login
                        </Button>                       
                        </Box>
                        }
                    </Box>
                </Toolbar> 
                <Toolbar sx={{justifyContent:'center',mb:1,display:{xs:'flex',sm:'none'}}} >
                    <Box sx={{width:'100%'}}>
                        <SearchBar/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        
        </Box>
  )
}

export default NavBar