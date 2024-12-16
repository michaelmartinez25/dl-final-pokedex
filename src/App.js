import React, { useEffect, useState, useRef } from 'react';
import Heading from './AppHeader';
import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import axios from "axios";
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
    <Heading/>
    <Box 
      sx={{
      // Full viewport size
      height: '100vh',
      width: '100%',
      
      // Apply galaxy background (image or gradient)
      backgroundImage: 'url(/galaxy2.png)',  // Path to your galaxy image in public folder
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',  // Keeps background fixed while scrolling
      
      // Optional: Adding some opacity to the background (like a nebula effect)
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens the background (optional)

      // Flexbox to center content vertically and horizontally
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      // overflow: 'hidden',  // Prevent content from overflowing
    }}
    >
    <div className="app-container">
    <Outlet/>
    </div>
    </Box>
    </>
  );
}

export default App;

