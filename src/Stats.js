import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

//
/**
 *  A helper function to calculate the percentage for the progress bar.
 * @returns {float} what percentage the value is of the maximum stat bar
 */
function calculatePercentage(statValue) {
  return (statValue / 255) * 100;
};

/**
 * A component that displays a Pokemon's stats in bars
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.stats - The stats for the component.
 * @returns {JSX.Element} - The pokemon stats component
 */
function PokemonStats({ stats }) {
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
                backgroundColor: stat_colors[stat.stat.name], // get color from dictionary
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
