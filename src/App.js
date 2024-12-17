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
          height: "100vh",
          width: "100vw",
          marginTop: "60px",
          padding: "20px",
          backgroundImage: "url(/galaxy2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          // center box vertically and horizontally
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default App;
