import React from "react";
import Pokedex from 'pokedex-promise-v2';
import { Button } from "@mui/material";

// Create a button that triggers the speak function when clicked
function TextToSpeech({ pokemon_name }) {
    const P = new Pokedex();

    function dexEntry(dexEntry) {
        dexEntry = dexEntry.split("\n");
        let finalDexEntry = "";
        for (let i = 0; i < dexEntry.length; i++) {
            finalDexEntry += dexEntry[i] + " ";
        }
        return finalDexEntry;
    }

    function speak() {
        P.getPokemonSpeciesByName(pokemon_name)
            .then((response) => {
                const pkmn_name = response.name;
                const flavorText = dexEntry(response.flavor_text_entries[0].flavor_text);
                const pokemon_genus = response.genera[7].genus;
                const pokedex_entry = pkmn_name + ", the " + pokemon_genus + ". " + flavorText;
                
                // Create a SpeechSynthesisUtterance
                const utterance = new SpeechSynthesisUtterance(pokedex_entry);
            
                // Select a voice
                const voices = speechSynthesis.getVoices();
                utterance.voice = voices[42]; // The closest voice to the original Pokedex
            
                // Speak the text
                speechSynthesis.speak(utterance);
            })
            .catch((error) => {
            console.log('There was an ERROR: ', error);
            });
    }

    return (
      <Button
        onClick={speak}
        sx={{
          backgroundColor: "#cc0000", // Match the theme color
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px", // Rounded corners for a sleek look
          fontWeight: "bold",
          fontSize: "12px",
          "&:hover": {
            backgroundColor: "#990000", // 
            transform: "scale(1.05)", // Slight scale-up effect for hover
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow on hover
          },
        }}
      >
        Speak
      </Button>
    );
  }

export default TextToSpeech;
