/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import GameTable from "./components/GameTable";

const parseGamesAsJson = (text) => {
  const lines = text.split("\n");
  const gamesJson = {};
  let currentYear = null;
  let gameIndex = 1;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim(); // Elimina espacios adicionales
    console.log(`Línea ${index}: "${trimmedLine}"`);

    const yearMatch = trimmedLine.match(/^\d{4}$/); // Detecta años
    if (yearMatch) {
      currentYear = yearMatch[0];
      console.log(`Año detectado: ${currentYear}`);
      gamesJson[currentYear] = {};
      gameIndex = 1;
    } else if (currentYear) {
      const gameMatch = trimmedLine.match(/^-([\w\s:'-]+)\(([\w\s]+)\)[\-]+([\d,\.]+)$/);
      if (gameMatch) {
        console.log("Juego detectado:", gameMatch[0]);
        const [, title, platform, score] = gameMatch;
        gamesJson[currentYear][`game${gameIndex}`] = {
          name: title.trim(),
          description: `${title.trim()} para ${platform.trim()} con puntuación ${score}`,
          image: "https://via.placeholder.com/150", // Imagen placeholder
          nota: `${parseFloat(score.replace(",", ".")) * 10}`, // Precio ficticio
        };
        gameIndex++;
      } else {
        console.log("No se pudo parsear la línea:", trimmedLine);
      }
    }
  });

  console.log("Datos parseados como JSON:", gamesJson);
  return gamesJson;
};

function App() {
  const [gamesJson, setGamesJson] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parsedJson = parseGamesAsJson(text);
        setGamesJson(parsedJson);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <h1>Game Data Viewer</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {Object.keys(gamesJson).length > 0 ? (
        <GameTable gamesJson={gamesJson} />
      ) : (
        <p>Por favor, sube un archivo .txt para visualizar los datos.</p>
      )}
    </div>
  );
}

export default App;
