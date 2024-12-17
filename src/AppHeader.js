import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

/**
 * A function that returns the Header component of the app
 *
 * @returns {JSX.Element} - the header component
 */
function Heading() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * A function that is triggered when the 'x' button is clicked.
   * Navigates to the beginning
   */
  function handleClick() {
    // if the we're at the home page trigger a refresh
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (
    <AppBar
      sx={{
        position: "fixed",
        top: 0,
        background: "linear-gradient(45deg, #b30000, #cc3333)", // Gradient background
        padding: "10px 0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            cursor: "pointer", // add pointer cursor for clickable effect
          }}
          onClick={handleClick}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "1.8rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Pokédex
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Heading;
