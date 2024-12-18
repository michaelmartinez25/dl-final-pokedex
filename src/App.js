import Heading from "./AppHeader";
import "./App.css";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

/**
 * The app. Has a heading and uses react-router outlet to render the other pages. 
 *
 * @returns {JSX.Element} returns the App component
 */
function App() {
  return (
    <>
      <Heading />
      <Box
        sx={{
          position: "fixed", // this is fixed
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0, 0, 0, 1.0)", // completely black background, seen if scrolling past bg image
          backgroundAttachment: "fixed", // background should also be fixed
          zIndex: -1, // ensures it stays behind all content
        }}
      />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          marginTop: "60px",
          padding: "20px",
          backgroundImage: "url(/galaxy2.png)", // have bg image be the galaxy (wow)
          backgroundSize: "cover", // covers whole viewport
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default App;
