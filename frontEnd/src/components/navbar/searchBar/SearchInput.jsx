import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults, fetchSuggestions } from './searchThunks';
import { IconButton, InputAdornment, List, ListItemButton, ListItemText, Paper, Popper, TextField } from '@mui/material';
import { setQuery, setSearchProducts, setSuggestions } from '../../../features/search/searchSlice';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchProducts } from '../../../features/product/productSlice';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const dispatch = useDispatch();
    const {query, suggestions} = useSelector(state=> state?.search);
    const anchoRef = useRef(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const isReady = Boolean(anchoRef.current && anchoRef.current.offsetParent !== null);

    //
    const skipSuggestionsRef = useRef(false);

    // Debounse with useEffect
    /*When a user types into your search input:

    You don’t want to immediately hit the API with every keystroke.

    Instead, you wait a tiny bit (e.g., 300ms) after the user stops typing—then fetch suggestions.

    That delay is called a debounce. If the user types again before the delay ends, the pending call is cancelled and restarted.
    */
    useEffect(()=>{
        if (skipSuggestionsRef.current) {
            skipSuggestionsRef.current = false; // reset for next time
            return;
        }

        if(query.trim()){
            const delay=setTimeout(()=>{
                dispatch(fetchSuggestions(query));
                setOpen(true);
            },300);
            return ()=>clearTimeout(delay); // Cancel on next keystroke
        }else{
            setOpen(false);
        }
    },[query])

    const handleChange = (e)=>{
        dispatch(setQuery(e.target.value));
    };

    const handleKeyDown=(e)=>{
        if(e.key==="Enter"&&query.trim()){
            dispatch(fetchSearchResults(query)); // fetaching the search results.
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setOpen(false);
        }
    }

    const handleSelect = (value)=>{
        dispatch(setQuery(value)); // or trigger full search here
        // dispatch(fetchProducts(value));
        dispatch(fetchSearchResults(value));
        skipSuggestionsRef.current = true; //prevent suggestion fetch
        navigate(`/search?q=${encodeURIComponent(value)}`);
        setOpen(false);
        
    }

    const handleClear=()=>{
        dispatch(setQuery(''));
        dispatch(setSuggestions([]));
        dispatch(setSearchProducts([]));
        dispatch(fetchProducts());
        setOpen(false);
    }
  return (
    <>
       <TextField 
            variant='outlined'
            fullWidth
            value={query}
            onChange={handleChange}
            inputRef={anchoRef}
            placeholder='Search products'
            onKeyDown={handleKeyDown}
            size='small'
            slotProps={{
                input:{
                    startAdornment:(
                    <InputAdornment position='start' sx={{mr:1}}>
                        <SearchIcon/>
                    </InputAdornment>
                    ),
                    endAdornment: query&&(
                        <InputAdornment position='end' sx={{ml:1}}>
                            <IconButton onClick={handleClear} edge="end" size='small'>
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
       />
        <Popper open={open && !!anchoRef.current} anchorEl={isReady?anchoRef.current:undefined} placement='bottom-start'>
            <Paper sx={{width:anchoRef.current?.offsetWidth}}>
                <List dense>
                    {Array.isArray(suggestions)&&suggestions.map((item)=>(
                        <ListItemButton key={item.id} onClick={()=>handleSelect(item.name)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </Popper>
    </>
  )
}

export default SearchInput;