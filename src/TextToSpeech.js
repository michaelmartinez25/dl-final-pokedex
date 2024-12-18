import React, { useState } from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  // the voice of the text-to-speech
  const voice = speechSynthesis
    .getVoices()
    .filter((voice) => voice.name === "Trinoids")[0];
  utterance.voice = voice;
  // handle when utterance starts and ends
  utterance.onstart = () => setIsSpeaking(true); 
  utterance.onend = () => setIsSpeaking(false); 

  function speak() {
    // if the button is pressed and the pokemon is speaking, stop it
    if (isSpeaking) {
      // cancel
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speechSynthesis.speak(utterance);
    }
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
      <VolumeUpIcon />
    </IconButton>
  );
}

export default TextToSpeech;
