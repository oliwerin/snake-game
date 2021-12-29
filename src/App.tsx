import { useEffect, useState } from "react";

import { Game } from "./components";

import "./App.css";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      setHasGameStarted(false);
      setIsGamePaused(false);
      setIsGameOver(false);
    }
  }, [isGameOver]);

  return (
    <div>
      {hasGameStarted && !isGamePaused && (
        <button
          type="button"
          onClick={() => {
            setIsGamePaused(true);
          }}
        >
          Pause
        </button>
      )}
      <div className="gameContainer">
        {(!hasGameStarted || isGamePaused || isGameOver) && (
          <div className="overlay">
            {!hasGameStarted && (
              <button
                type="button"
                onClick={() => {
                  setHasGameStarted(true);
                }}
              >
                Play
              </button>
            )}
            {isGamePaused && (
              <button
                type="button"
                onClick={() => {
                  setIsGamePaused(false);
                }}
              >
                Resume
              </button>
            )}
          </div>
        )}
        <Game
          hasGameStarted={hasGameStarted}
          isGamePaused={isGamePaused}
          setIsGameOver={setIsGameOver}
        />
      </div>
    </div>
  );
}

export default App;
