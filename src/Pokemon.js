import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Grid2, Typography, Box, IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import PokemonStats from "./Stats";
import TextToSpeech from "./TextToSpeech";
import axios from "axios";

// function ImageTest() {
//   const [file, setFile] = useState()

//   function handleChange(event) {
//     setFile(event.target.files[0])
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     const url = '/model/classify';
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileName', file.name);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     };
//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data);
//     });

//   }

//   return (
//     <div className="App">
//         <form onSubmit={handleSubmit}>
//           <h1>File Upload</h1>
//           <input type="file" onChange={handleChange}/>
//           <button type="submit">Upload</button>
//         </form>
//     </div>
//   );
// }

function base64ToFile(base64String, fileName) {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

function Pokemon() {
  const location = useLocation();
  // const navigate = useNavigate();
  // console.log(location.state)
  const file = location.state?.image || "pikachu";
  console.log(file);
  // const file = localStorage.getItem("capturedImage")
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // const handleClose = () => {
  //   navigate("/");
  // };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
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
        const pokemonName = response.data.toLowerCase();

        const infoResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        setPokemonInfo(infoResponse.data);

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
        );
        setPokemonSpecies(speciesResponse.data);

        console.log(speciesResponse.data);
        window.scrollTo(0, 0);
      } catch (err) {
        setError("Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [file]);

  return (
    // <Box sx={{ height: "100vh", width: "100vw" }}> {/* Fullscreen layout */}

    <Grid2
      container
      sx={{
        height: "90vh",
        width: "80vw",
        // boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
        // borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
        }}
      >
        <CloseIcon />
      </IconButton> */}
      {/* left side */}
      <Grid2
        item
        xs={12} // Mobile: full-width
        md={12} // Desktop: half-width
        sx={{
          backgroundColor: "#f5f5f5", // Light background for the left side
          height: "100%",
          width: "45%",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          borderRadius: "10px",
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
                gap: 2,
              }}
            >
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
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#999" }}
                >
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
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#555" }}
                >
                  {pokemonSpecies.flavor_text_entries
                    .find((entry) => entry.language.name === "en")
                    ?.flavor_text.replace(/\f/g, " ") ||
                    "No description available."}
                </Typography>
              </Box>
              <TextToSpeech pokemon_name={pokemonInfo.name} />
            </Grid2>
            // <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            //   {pokemonInfo.abilities[0].ability.name}
            // </Typography>
          )
        )}
      </Grid2>
      {/* right side */}
      {/* <Grid2
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
            <Grid2
              container
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  width: "75%",
                  marginTop: "40px",
                }}
              >
                <Typography>
                  {pokemonSpecies.flavor_text_entries[0].flavor_text}
                </Typography>
              </Box>
            </Grid2>
          )
        )}
      </Grid2> */}
    </Grid2>
    // </Box>
  );
}

export default Pokemon;
