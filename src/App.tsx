import { useEffect, useState } from "react";

import { Button, Game } from "./components";

import "./App.css";

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isGameOver) {
      setHasGameStarted(false);
      setIsGamePaused(false);
      setIsGameOver(false);
    }
  }, [isGameOver]);

  return (
    <div>
      <div className="header">
        <span>Score: {score}</span>
        {!hasGameStarted && (
          <Button
            label="PLAY"
            onClick={() => {
              setHasGameStarted(true);
              setScore(0);
            }}
          />
        )}
        {hasGameStarted && (
          <Button
            label={isGamePaused ? "RESUME" : "PAUSE"}
            onClick={() => {
              setIsGamePaused(!isGamePaused);
            }}
          />
        )}
      </div>
      <div className="gameContainer">
        {(!hasGameStarted || isGamePaused || isGameOver) && (
          <div className="overlay" />
        )}
        <Game
          hasGameStarted={hasGameStarted}
          isGamePaused={isGamePaused}
          setIsGameOver={setIsGameOver}
          setScore={setScore}
        />
      </div>
      <div className="footer">Controls: ←, ↑, →, ↓ </div>
    </div>
  );
}

export default App;
