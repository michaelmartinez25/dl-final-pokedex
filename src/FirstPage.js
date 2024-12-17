import React, { useState, useRef } from "react";
import "./App.css";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";
import { Input, Button, Box, Alert, Snackbar } from "@mui/material";

/**
 * A component that render the pokemon's details: its picture, description, and stats.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.setImage - the useState set function for image
 * @returns {JSX.Element} - An upload button
 */
function UploadImage({ setImage }) {
  const [openAlert, setOpenAlert] = useState(false);
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
    } else if (file){
      // if there's a file that's uploaded that is not an image file
      setOpenAlert(true);
    }
  }
  return (
    // <Input type="file" accept="image/*" onChange={handleUpload}/>
    <>
      <Button
        component="label" // Make the button act like a label for the input
        sx={{
          backgroundColor: "white", // White background
          color: "#cc0000", // Red text color to match theme
          padding: "8px 16px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "14px", // Smaller font size
          letterSpacing: "1px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#f2f2f2", // Light grey on hover
            transform: "scale(1.05)", // Slight scale-up on hover
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Stronger shadow on hover
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
          sx={{ display: "none" }} // Hide the default input
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

const Camera = ({ openCam, setOpenCam, setImage }) => {
  const webcamRef = useRef(null);
  const onAcessClick = () => {
    setOpenCam(true);
    setImage(null);
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture the screenshot
    setImage(imageSrc); // Set the captured image in the state
  };
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
              backgroundColor: "#cc0000", // Match the theme color
              color: "white",
              padding: "12px 24px", // Add padding for better spacing
              // borderRadius: "30px", // Rounded corners
              fontWeight: "bold",
              fontSize: "18px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
              "&:hover": {
                backgroundColor: "#a30000", // Darker red on hover
                transform: "scale(1.05)", // Slight scale-up effect on hover
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)", // Stronger shadow on hover
              },
              transition:
                "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease", // Smooth transition
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
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "50vh",
            flexDirection: "column",
            padding: "20px", // Optional: Add padding if needed
          }}
        >
          <Box
            sx={{
              border: "5px solid #cc0000", // Red border to match your theme
              borderRadius: "20px", // Rounded corners
              padding: "10px", // Padding around the webcam
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for a floating effect
              transform: "scale(1)", // Slight scaling effect when focused
              width: "45%", // Set width to 50% of the parent container
              height: "60%", // Set height to 50% of the parent container to make it square
              transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition effect for interaction
              "&:hover": {
                transform: "scale(1.05)", // Slightly scale up when hovered
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.5)", // Stronger shadow on hover
              },
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%" // Make webcam fill 100% of the container
              height="100%"
              style={{
                transform: "scaleX(-1)", // This will mirror the webcam feed
                height: "auto",
              }}
            />
          </Box>
          <Button
            onClick={capture}
            sx={{
              backgroundColor: "#cc0000", // Match the theme color
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px", // Rounded corners for a sleek look
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#f2f2f2", // Light gray on hover
                transform: "scale(1.05)", // Slight scale-up effect for hover
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow on hover
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
};

function PokemonButton({ image }) {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    // const file = await dataUrlToFile(image, "foo-bar")
    console.log("Image being passed to button:", image);
    navigate("/whos-that-pokemon", { state: { image: image } });
  };

  return (
    <Button
      onClick={handleOnClick}
      sx={{
        backgroundImage: 'url("https://your-image-url.com")', // Replace with your image URL
        backgroundSize: "cover", // Make the image cover the entire button
        backgroundPosition: "center", // Center the image in the button
        color: "white", // White text to stand out against the background
        padding: "16px 32px", // Spacing for a bigger, more impactful button
        borderRadius: "10px", // Rounded corners for a sleek look
        fontWeight: "bold", // Bold font for emphasis
        fontSize: "20px", // Larger text for readability
        fontFamily: "Arial, sans-serif", // Clean and modern font
        letterSpacing: "1.5px", // Slight spacing between letters
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow for better text visibility
        textTransform: "uppercase", // Uppercase for a strong visual impact
        width: "400px", // Width to create a bold, rectangular shape
        height: "80px", // Adjust height to make it proportional
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.7)", // Subtle shadow for depth
        "&:hover": {
          transform: "scale(1.05)", // Slight zoom effect on hover
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Stronger shadow on hover
          opacity: 0.9, // Slight dimming effect on hover
        },
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease", // Smooth hover effects
      }}
    >
      WHO'S THAT POKEMON?
    </Button>
  );
}

function FirstPage() {
  const [openCam, setOpenCam] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <Box
      sx={{
        gap: 1,
        overflowY: "auto", // Enable vertical scrolling
        display: "flex",
        // justifyContent: 'center',  // Center horizontally
        alignItems: "center", // Center vertically
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        padding: "20px", // Optional: Add padding if needed
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
            maxWidth: "400px", // Optional: Set a max width for larger screens
            maxHeight: "300px", // Optional: Set a max height to control overflow
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
