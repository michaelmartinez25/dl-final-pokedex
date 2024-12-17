// PokemonStats.js
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

// A helper function to calculate the percentage for the progress bar
const calculatePercentage = (statValue) => {
  return (statValue / 255) * 100;
};

// PokemonStats component
const PokemonStats = ({ stats }) => {
    const stat_colors = {
        hp: "#ff6b6b", 
        attack: "#f9c74f", 
        defense: "#90be6d", 
        "special-attack": "#4d96ff", 
        "special-defense": "#9d4edd", 
        speed: "#f3722c",
      };

  return (
    <Box sx={{ width: "75%",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
      {stats.map((stat) => (
        <Box key={stat.stat.name} sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {stat.stat.name}: {stat.base_stat}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculatePercentage(stat.base_stat)}
            sx={{
              height: "12px",
              borderRadius: "8px",
              "& .MuiLinearProgress-bar": {
                backgroundColor: stat_colors[stat.stat.name], // Dynamic color
              },
              backgroundColor: "#e0e0e0",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PokemonStats;
