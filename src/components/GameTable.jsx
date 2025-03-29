/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const GameTable = ({ gamesJson }) => {
  return (
    <div>
      {Object.keys(gamesJson).map((year) => (
        <div key={year}>
          <h2>{year}</h2>
          <div>
            {Object.values(gamesJson[year]).map((game, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <img src={game.image} alt={game.name} width="150" height="150" />
                <p>
                  <strong>Nota:</strong> {game.nota}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameTable;
