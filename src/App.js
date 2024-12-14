import logo from './logo.svg';
import React, { useEffect, useState, useRef } from 'react';
import AppBar from "@mui/material/AppBar";
import './App.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import axios from "axios";


// header that is always in the app 
// we need to route between the different pages --> g

// Need to do
// Image Upload/ Take a photo button implmentation
// Who's that Pokemon button implementation
// 
// Pokemon information display


// Want to do

function Heading() {
  return(
  <AppBar style={{ backgroundColor: "#cc0000" }}>
    <Container maxWidth="xl">Pokedex</Container> </AppBar>
  );
}

function UploadImage() {
  return (
    <input type="file" accept="image/*" />
    // TODO: Take the selected image and display it
  );
}

function ImageTest() {

  const [file, setFile] = useState()

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const url = '/model/image';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });

  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

const Camera = () => {
  const webcamRef = useRef(null);
  const onAcessClick = () => {
    setOpenCam(true)
  }
  const capture = () => {
    // const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the image data, e.g., send it to a server
  }
    return (
    <div>
    {openCam ? <Button onClick={onAcessClick}>Access Camera</Button> : 
    <Box>
       <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button onClick={capture}>Capture photo</Button>
    </Box>
    }
    </div> 
  )
}


function MyButton() {
  return (
    <Button>
      Who's that Pokemon?
    </Button> );
}

function Test() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/model/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <p>The current time is {currentTime}.</p>
  );
}

function App() {
  const  [openCam, setOpenCam] = useState(false);
  return (

    <React.Fragment>
    <Heading/>
    <div>
    <Camera openCam={openCam} setOpenCam={setOpenCam}/>
    <UploadImage />
    <ImageTest/>
    </div>
    <Test />
    </React.Fragment>
  );
}

export default App;

