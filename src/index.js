import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FirstPage from './firstPage';
import Pokemon from './Pokemon';
import Heading from './AppHeader';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Switch } from '@mui/material';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       defaultProps: {
//         variantMapping: {
//           h1: 'h2',
//           h2: 'h2',
//           h3: 'h2',
//           h4: 'h2',
//           h5: 'h2',
//           h6: 'h2',
//           subtitle1: 'h2',
//           subtitle2: 'h2',
//           body1: 'span',
//           body2: 'span',
//         },
//       },
//     },
//   },
// });

{/* <React.StrictMode> */}

root.render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<App />}>
    <Route index element={<FirstPage/>} />
    <Route path="whos-that-pokemon" element={<Pokemon/>}/>
  </Route>
  </Routes>
  </BrowserRouter>
 </ThemeProvider>
);



{/* <Routes>
<Route path="/" element={<App />}>
  <Route index element={<FirstPage/>} />
  <Route path="whos-that-pokemon" element={<Pokemon/>}/>
</Route>
</Routes> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
