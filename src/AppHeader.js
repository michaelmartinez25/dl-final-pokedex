import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";

function Heading() {
  return (
    <AppBar
      sx={{
        position: 'fixed',
        top: 0,
        background: 'linear-gradient(45deg, #b30000, #cc3333)',  // Gradient background
        padding: '10px 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',  // Subtle shadow to elevate the header
        transition: 'box-shadow 0.3s ease',  // Smooth transition on hover
        '&:hover': {
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',  // Deepen shadow on hover
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',  // Use flexbox to center content within the Container
          justifyContent: 'center',  // Horizontally center content
          alignItems: 'center',  // Vertically center content
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.8rem',  // Slightly bigger font size for more emphasis
            letterSpacing: '2px',
            textTransform: 'uppercase',  // Transform text to uppercase for a bold statement
            fontFamily: 'Roboto, sans-serif',  // Clean font family
          }}
        >
          Pokedex
        </Typography>
      </Container>
    </AppBar>
  );
}

export default Heading;
