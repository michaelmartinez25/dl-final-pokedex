import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container'

function Heading() {
    return(
    <AppBar style={{ backgroundColor: "#cc0000" }}>
      <Container maxWidth="xl">Pokedex</Container> </AppBar>
    );
  }

export default Heading;