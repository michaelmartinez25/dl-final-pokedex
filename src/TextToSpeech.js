import React from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

/**
 * A button component that speaks the name and description of the pokemon
 *
 * @param {string} name - the pokemon name
 * @param {string} description - the description of the pokemon
 * @returns {JSX.Element} - the button that when click triggers the speaking
 */
function TextToSpeech({ name, description }) {
    // create an utterance synthesis
    const utterance = new SpeechSynthesisUtterance(name + ". " + description);

    // the voice of the text-to-speech
    const voice = speechSynthesis.getVoices().filter(voice => voice.name === 'Trinoids')[0];
    utterance.voice = voice;
  
  function speak() {
    // speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <IconButton
      onClick={speak}
      sx={{
        backgroundColor: "#cc0000", 
        color: "white",
        padding: "10px 20px",
        borderRadius: "30px", 
        fontWeight: "bold",
        fontSize: "12px",
        "&:hover": {
          backgroundColor: "#990000",
          transform: "scale(1.05)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <VolumeUpIcon/>
    </IconButton>
  );
}

export default TextToSpeech;
