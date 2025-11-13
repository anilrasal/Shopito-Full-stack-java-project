import {createTheme} from "@mui/material/styles";
import { green, grey, orange } from "@mui/material/colors";

const getTheme = (mode)=>( createTheme({
    palette: {
        mode,
        customButton:{
            light:grey[300],
            main:grey[500],
            dark:grey[700],
            darker: grey[900],
        },
        customGreen:{
            light:green[300],
            main: green[500],
            dark: green[700],
            darker: green[900]
        },
        customOrange:{
            light: orange[300],
            main:orange[500],
            dark: orange[700],
            darker: orange[900]
        }
    },
    typography: { fontFamily:"monospace"},
}));

export default getTheme;