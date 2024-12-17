import React, { useState, useRef } from "react";
import "./App.css";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import { Input, Button, Box, Alert, Snackbar } from "@mui/material";

/**
 * An upload button component
 *
 * @param {Object} props - the props for the component
 * @param {Object} props.setImage - the useState set function for image
 * @returns {JSX.Element} - an upload button
 */
function UploadImage({ setImage }) {
  const [openAlert, setOpenAlert] = useState(false);

  /**
   * A function that checks if the file is an image. if it is
   * turn it into a base64 dataURL to display it for the user
   */
  function handleUpload(event) {
    const file = event.target.files[0];
    // get the image URL to display it
    if (file && file.type.startsWith("image/")) {
      // Create a FileReader to convert file to Base64
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
      };
      // turns image to dataUrl, base64
      reader.readAsDataURL(file);
    } else if (file) {
      // if there's a file that's uploaded that is not an image file
      // this opens an alert component inside a snackbar at the bottom left
      setOpenAlert(true);
    }
  }
  return (
    // <Input type="file" accept="image/*" onChange={handleUpload}/>
    <>
      <Button
        component="label" // Make the button act like a label for the input
        sx={{
          backgroundColor: "white",
          color: "#cc0000", // red text
          padding: "8px 16px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "14px",
          letterSpacing: "1px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // shadow
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#f2f2f2", // light grey
            transform: "scale(1.05)", // scale-up on hover
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // stronger shadow on hover
          },
          transition:
            "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {" "}
        Upload Image
        <Input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          sx={{ display: "none" }}
        />
      </Button>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="error" onClose={() => setOpenAlert(false)}>
          Please upload an Image file
        </Alert>
      </Snackbar>
    </>
  );
}

/**
 * A component that renders an "access camera" component or a webcam with a capture component
 *
 * @param {Object} props - the props for the component
 * @param {Object} props.openCam - the state the determins whether to open the webcam or not
 * @param {Object} props.setOpenCam - the useState function to set openCam
 * @param {Object} props.setImage - the useState function to set image

 * @returns {JSX.Element} - an "access camera" component or a webcam with a capture component
 *                           depending on whether openCam is true/false
 */
function Camera({ openCam, setOpenCam, setImage }) {
  const webcamRef = useRef(null);
  const onAcessClick = () => {
    setOpenCam(true);
    setImage(null);
  };

  /**
   * A function captures a webcam photo
   */
  function capture() {
    // Get a screenshot of webcam
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }
  return (
    <div>
      {!openCam ? (
        // only open when cam is opened but also when an image is not captured
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "100px",
            gap: 2,
          }}
        >
          <Button
            onClick={onAcessClick}
            sx={{
              backgroundColor: "#cc0000",
              color: "white",
              padding: "12px 24px", // padding for
              fontWeight: "bold",
              fontSize: "18px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#a30000", // darker red on hover
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)", //
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease", // smooth transition
            }}
          >
            Access Camera
          </Button>
          <UploadImage setImage={setImage} />
        </Box>
      ) : (
        <Box
          sx={{
            gap: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              border: "5px solid #cc0000", // red border around image
              borderRadius: "20px",
              padding: "10px", // padding around the webcam
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              transform: "scale(1)",
              width: "45%", // width to 45% of the parent container
              height: "60%", // height to 60% of the parent
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              style={{
                transform: "scaleX(-1)", // flips horizontally the webcam since webcam flips image
                height: "auto",
              }}
            />
          </Box>
          <Button
            onClick={capture}
            sx={{
              backgroundColor: "#cc0000",
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#f2f2f2",
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Capture photo
          </Button>
          <UploadImage setImage={setImage} />
        </Box>
      )}
      {/* Display the captured image */}
    </div>
  );
}

/**
 * A component that only opens once an image is inputted. when clicked, navigates the next page
 *
 * @param {Object} props - the props for the component
 * @param {Object} props.image - the image to be sent to the other page

 * @returns {JSX.Element} - a "who's that pokemon" button styled to be the same as the background
 */
function PokemonButton({ image }) {
  const navigate = useNavigate();

  /**
   * Navigates to the who's that pokemon page with the uploaded/caputred image
   */
  function handleOnClick() {
    navigate("/whos-that-pokemon", { state: { image: image } });
  }

  return (
    <Button
      onClick={handleOnClick}
      sx={{
        backgroundImage: 'url("https://your-image-url.com")', // background image url
        backgroundSize: "cover", // covers entire button
        backgroundPosition: "center",
        color: "white", // white text
        padding: "16px 32px",
        borderRadius: "10px",
        fontWeight: "bold",
        fontSize: "20px",
        fontFamily: "Arial, sans-serif",
        letterSpacing: "1.5px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // shadow for better visibillity
        width: "400px",
        height: "80px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          opacity: 0.9, // dimming effect on hover
        },
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
      }}
    >
      WHO'S THAT POKEMON?
    </Button>
  );
}

/**
 * A component that renders the first page
 *
 * @returns {JSX.Element} - the elements of the first page (the camera, pokemonButton, and uploadButton components)
 */
function FirstPage() {
  const [openCam, setOpenCam] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <Box
      sx={{
        gap: 1,
        overflowY: "auto", // enable vertical scrolling
        display: "flex",
        alignItems: "center", // center vertically
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Camera openCam={openCam} setOpenCam={setOpenCam} setImage={setImage} />

      {image && (
        <img
          src={image}
          alt="Captured"
          style={{
            height: "auto",
            width: "15%",
            maxWidth: "400px", // set a max width
            maxHeight: "300px", // set max height
            borderRadius: "10px",
            transform: "scaleX(-1)",
          }}
        />
      )}
      {image && <PokemonButton image={image} />}
    </Box>
  );
}

export default FirstPage;
