import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './app/store.js'
import {BrowserRouter} from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import getTheme from './theme'
import { useState } from 'react';

const Root = () =>{
  const [mode, setMode] = useState('light');

  //const newMode = useSelector((state)=> state.theme.mode);
  //const dispatch = useDispatch();

  const theme = getTheme(mode);
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App mode={mode} setMode={setMode} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  )
};

createRoot(document.getElementById('root')).render(<Root/>);
