import logo from './logo.svg';
import React, { useState, useRef} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Webcam from 'react-webcam';


// header that is always in the app 
// we need to route between the different pages --> g

// Need to do
// Image Upload/ Take a photo button implmentation
// Who's that Pokemon button implementation
// 
// Pokemon information display


// Want to do

function Heading() {
  return 
  <div><h1 className="greeting">Pokedex</h1></div>
  
}

function UploadImage() {
  return (
    <input type="file" accept="image/*" />
  );
}

const Camera = () => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the image data, e.g., send it to a server
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button onClick={capture}>Capture photo</Button>
    </div>
  );
};

function onButtonClick() {
  // Fetch the 
  
}
function MyButton() {
  return (
    <Button>
      Who's that Pokemon?
    </Button> );
}

function App() {
  return (
    <React.Fragment>
    <Heading/>
    <div>
    <Camera />
    <UploadImage/>
    </div>
    </React.Fragment> 
  );
}

export default App;

