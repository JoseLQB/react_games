/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const GameTable = ({ gamesJson, selectedYear, selectedPlatform }) => {
  const [modalImage, setModalImage] = useState(null);

  const closeModal = () => setModalImage(null);

  if (!selectedYear || !gamesJson[selectedYear]) return <p>No hay datos para este año.</p>;

  const filteredGames = Object.values(gamesJson[selectedYear]).filter(
    (game) => selectedPlatform === "Todas" || game.platform === selectedPlatform
  );

  return (
    <div>
      <h2>{selectedYear}</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredGames.map((game, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "5px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <img
              src={game.image}
              alt={game.name}
              width="180"
              height="180"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => setModalImage(game.image)}
            />
            <p>
              <strong>Nota:</strong> {game.nota}
            </p>
          </div>
        ))}
      </div>

      {/* Modal para ver la imagen en grande */}
      {modalImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <img
            src={modalImage}
            alt="Ampliado"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GameTable;
