import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Grid2, Typography, Box, IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PokemonStats from "./Stats";
import TextToSpeech from "./TextToSpeech";
import axios from "axios";

/**
 * A function to turn base64 (dataURL) to images. Needed to turn screenshot images and uploaded
 * images back into image files to send over to the backend.
 *
 * @param {Object} dataUrl - the dataURL of the file
 * @param {string} fileName - the name of the to-be-created file
 * @returns {File} returns a new file object witht the type png
 */
async function base64ToFile(dataUrl, fileName) {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], fileName, { type: "image/png" });
}

/**
 * A component that render the pokemon's details: its picture, description, and stats.
 *
 * @param {Object} props - the props for the component
 * @param {Object} props.pokemonInfo - information about the Pokémon, including id, name, and stats
 * @param {Object} props.pokemonSpecies - species-specific information, including descriptions and flavor-text
 * @returns {JSX.Element} the PokemonDetails component.
 */
function PokemonDetails({ pokemonInfo, pokemonSpecies }) {
  const navigate = useNavigate();
  /**
   * function that handles clicking on the icon close button, navigates to home page 
   * to mimic a closing effect
   * 
   */
  function handleClose() {
    navigate("/");
  }

  return (
    <Grid2
      container
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        gap: 1.3,
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "8px",
          right: "15px",
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        sx={{
          height: "250px",
          width: "250px",
          mt: 5,
          backgroundImage: `url(${pokemonInfo.sprites.other["official-artwork"].front_default})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
      <Grid2 container sx={{ gap: 0.5, flexDirection: "row" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#999" }}>
          #{pokemonInfo.id}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {pokemonInfo.name}
        </Typography>
      </Grid2>
      <PokemonStats stats={pokemonInfo.stats} />
      <Box
        sx={{
          width: "75%",
          height: "5%", // Fixed height for scroll
          overflowY: "auto",
          // backgroundColor: "#fafafa",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "justify",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#555" }}>
          {pokemonSpecies.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            ?.flavor_text.replace(/\f/g, " ") || "No description available."}
        </Typography>
      </Box>
      <TextToSpeech
        name={pokemonInfo.name}
        description={
          pokemonSpecies.flavor_text_entries
            .find((entry) => entry.language.name === "en")
            ?.flavor_text.replace(/\f/g, " ") || "No description available."
        }
      />
    </Grid2>
  );
}

/**
 * A component that fetches pokemon details from an image, produces an error otherwise
 * 
 * @returns {JSX.Element} returns a loading scree, an error, or the Pokemon's details if fetching is successful
 */
function Pokemon() {
  const location = useLocation();
  // get the image from the state passed in during navigation
  const image = location.state?.image;
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  // fetch pokemon details from image
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // set loading to true until we are done getting data
        setLoading(true);
        // since the images and screen shots are in base64, turn them into a file
        const file = await base64ToFile(image, "foo-bar.png");
        // our classifier endpoint to send the image to
        const url = "/model/classify";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const response = await axios.post(url, formData, config);
        // the response will be the pokemonName
        const pokemonName = response.data.toLowerCase();
        // use that to query the poke-api
        const infoResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        setPokemonInfo(infoResponse.data);

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
        );
        setPokemonSpecies(speciesResponse.data);
      } catch (err) {
        // otherwise, set an error
        setError("Failed to fetch Pokémon data");
      } finally {
        // and once it's done, set loading to false
        setLoading(false);
      }
    };

    fetchPokemonData();
    // scroll to the top of the page when this new page starts for full view
    // of details
    window.scrollTo(0, 0);
  }, [image]);

  return (
    <Grid2
      container
      sx={{
        height: "90vh",
        width: "80vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        item
        xs={12} // mobile: full-width
        md={12} // desktop: full width
        sx={{
          backgroundColor: "#f5f5f5",
          height: "100%",
          width: "45%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        {/* if information is still being retrieved (loading = true), have a loading circle*/}
        {loading ? (
          <Grid2
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#FFCB05" }} />
          </Grid2>
        ) : error ? (
          <Grid2
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "80%",
            }}
          >
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Grid2>
        ) : (
          pokemonInfo && (
            // render the pokemon details
            <PokemonDetails
              pokemonInfo={pokemonInfo}
              pokemonSpecies={pokemonSpecies}
            />
          )
        )}
      </Grid2>
    </Grid2>
  );
}

export default Pokemon;
