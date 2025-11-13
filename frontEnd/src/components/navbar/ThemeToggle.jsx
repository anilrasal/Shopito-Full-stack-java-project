import { IconButton, Tooltip } from "@mui/material";
import {LightMode,DarkMode} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../features/theme/themeSlice";

const ThemeToggle = ({mode,setMode}) => {
  // const newMode = useSelector((state)=>state.theme.mode);
  // const dispatch = useDispatch(); 
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton
             onClick={()=>setMode(prev=>(prev=== 'light'?'dark':'light'))}
            //onClick={()=>dispatch(toggleMode())}
            color="inherit"
        >
            {mode==='dark'?<LightMode/>:<DarkMode/>}
        </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle