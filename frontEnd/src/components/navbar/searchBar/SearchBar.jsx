import { Fade, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setQuery,clearQuery,setSuggestions } from '../../../features/search/searchSlice.js';
import { fetchSuggestions } from './searchThunks.js';

const SearchBar = () => {
  const dispatch = useDispatch();
  const queryFromStore = useSelector((state) => state.search.query);
  const [localQuery, setLocalQuery] = useState(queryFromStore||'');
  const inputRef = useRef();

  // Keep Redux and input state in sync
  useEffect(()=>{
    dispatch(setQuery(localQuery));
  },[localQuery,dispatch]);

  const handleClear = () =>{
    setLocalQuery('');
    dispatch(clearQuery());
    dispatch(setSuggestions([]));
  };

  const handleSearch=()=>{
    const trimmed = localQuery.trim();
    if(trimmed){
       dispatch(setQuery(trimmed));
      dispatch(fetchSuggestions(trimmed));
    }
  }
  return (
    <>
      <Paper 
        sx={{
          elevation:1,
          display:'flex',
          alignItems:'center',
          width:'100%',p:'2px 8px',
          borderRadius:2
        }}
        >
          <SearchIcon sx={{mr:1,display:{xs:'none',md:'block'}}}/>
          <InputBase
              placeholder='Search products...' 
              inputRef={inputRef}
              value={localQuery}
              onChange={(e)=>{
                setLocalQuery(e.target.value);
                dispatch(fetchSuggestions(localQuery.trim()));
              }}
              onKeyDown={e=>{
                if(e.key==='Enter') handleSearch();
              }}
              sx={{ flex: 1 }}
          />
          <IconButton onClick={handleClear}>
              <ClearIcon/>
          </IconButton>
          <Fade in timeout={300}>
            <IconButton 
              sx={{display:{xs:'flex',md:'none'}}}
              onClick={handleSearch}>
                <SearchIcon/>
            </IconButton>
          </Fade>
      </Paper>
    </>
  )
}

export default SearchBar