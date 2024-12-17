import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FirstPage from "./FirstPage";
import Pokemon from "./Pokemon";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MUI theme, needed to use "sx" property
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
// render everything 

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FirstPage />} />
          <Route path="whos-that-pokemon" element={<Pokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
