import React from "react";
import { IconButton } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function TextToSpeech({ name, description }) {

  function speak() {
    console.log(description)

    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(name + ". " + description);

    // the voice of the text-to-speech, tweak in demo
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[42];

    // Speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <IconButton
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
      <VolumeUpIcon/>
    </IconButton>
  );
}

export default TextToSpeech;
