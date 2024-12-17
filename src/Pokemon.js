import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Grid2, Typography, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function Pokemon() {
  const location = useLocation();
  // console.log(location.state)
  const pokemonName = location.state?.Pokemon || "pikachu";
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonInfo(response.data);
        // scroll to the top of the page
        window.scrollTo(0, 0)
        console.log(response.data);
        //   console.log(response.data);
      } catch (err) {
        setError("Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  return (
    // <Box sx={{ height: "100vh", width: "100vw" }}> {/* Fullscreen layout */}

    <Grid2
      container
      sx={{
        height: "90vh",
        width: "80vw",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
        // borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left Side */}
      <Grid2
        item
        xs={12} // Mobile: full-width
        md={12} // Desktop: half-width
        sx={{
          backgroundColor: "#f5f5f5", // Light background for the left side
          height: "100%",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          pokemonInfo && (
            <Grid2
              container
              sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  height: "300px",
                  width: "300px",
                  mt: 10,
                  backgroundImage: `url(${pokemonInfo.sprites.other["official-artwork"].front_default})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {pokemonInfo.name}
              </Typography>
            </Grid2>
            // <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            //   {pokemonInfo.abilities[0].ability.name}
            // </Typography>
          )
        )}
      </Grid2>

      <Grid2
        item
        xs={12} // Mobile: full-width
        md={12} // Desktop: half-width
        sx={{
          backgroundColor: "#e0e0e0", // Slightly different background for contrast
          // boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
          height: "100%",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          pokemonInfo && (
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              bruh
            </Typography>
          )
        )}
      </Grid2>
    </Grid2>
    // </Box>
  );
}

export default Pokemon;
