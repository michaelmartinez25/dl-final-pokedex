import Heading from "./AppHeader";
import "./App.css";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

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
          backgroundAttachment: "fixed", // Keeps background fixed while scrolling
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkens the background (optional)

          // Flexbox to center content vertically and horizontally
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
