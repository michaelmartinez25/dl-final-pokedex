import React, { useEffect, useState, useRef } from 'react';
import Heading from './AppHeader';
import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import axios from "axios";

function App() {
  const  [openCam, setOpenCam] = useState(false);
  return (
    <Heading/>
  );
}

export default App;

