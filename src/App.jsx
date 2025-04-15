/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import GameTable from "./components/GameTable";

const API_KEY = "174a2852a6164f7aa213051c19bfa04a"; // Reemplaza con tu clave de RAWG

const fetchGameImage = async (title) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${encodeURIComponent(title)}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.results.length > 0 ? data.results[0].background_image : "https://via.placeholder.com/150";
  } catch (error) {
    console.error("Error obteniendo imagen:", error);
    return "https://via.placeholder.com/150";
  }
};

const parseGamesAsJson = async (text) => {
  const lines = text.split("\n");
  const gamesJson = {};
  let currentYear = null;
  let gameIndex = 1;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const yearMatch = trimmedLine.match(/^\d{4}$/);

    if (yearMatch) {
      currentYear = yearMatch[0];
      gamesJson[currentYear] = {};
      gameIndex = 1;
    } else if (currentYear) {
      const gameMatch = trimmedLine.match(/^-([\w\s:'-]+)\(([\w\s]+)\)[\-]+([\d,\.]+)$/);
      if (gameMatch) {
        const [, title, platform, score] = gameMatch;
        const imageUrl = await fetchGameImage(title.trim());

        gamesJson[currentYear][`game${gameIndex}`] = {
          name: title.trim(),
          platform: platform.trim(),
          description: platform.trim(),
          image: imageUrl,
          nota: `${parseFloat(score.replace(",", ".")) * 10}`,
        };
        gameIndex++;
      }
    }
  }

  return gamesJson;
};

function App() {
  const [gamesJson, setGamesJson] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("Todas");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const parsedJson = await parseGamesAsJson(text);
        setGamesJson(parsedJson);
        setSelectedYear(Object.keys(parsedJson)[0] || null);
        setSelectedPlatform("Todas");
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  // Obtener lista de plataformas y su conteo
  const getPlatformOptions = () => {
    if (!selectedYear || !gamesJson[selectedYear]) return [];

    const platformCount = {};
    Object.values(gamesJson[selectedYear]).forEach((game) => {
      platformCount[game.platform] = (platformCount[game.platform] || 0) + 1;
    });

    return Object.entries(platformCount).map(([platform, count]) => ({
      name: platform,
      count,
    }));
  };

  return (
    <div className="App">
      <h1>Game Data Viewer</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />

      {loading ? (
        <p>Cargando juegos...</p>
      ) : Object.keys(gamesJson).length > 0 ? (
        <>
          {/* Filtro por Año */}
          <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
            {Object.keys(gamesJson).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Filtro por Plataforma */}
          <select onChange={(e) => setSelectedPlatform(e.target.value)} value={selectedPlatform}>
            <option value="Todas">Todas las plataformas</option>
            {getPlatformOptions().map(({ name, count }) => (
              <option key={name} value={name}>
                {name} ({count})
              </option>
            ))}
          </select>

          <GameTable gamesJson={gamesJson} selectedYear={selectedYear} selectedPlatform={selectedPlatform} />
        </>
      ) : (
        <p>Por favor, sube un archivo .txt para visualizar los datos.</p>
      )}
    </div>
  );
}

export default App;
