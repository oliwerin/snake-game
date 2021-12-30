import { Controls, GameArea } from "./components";
import { useRunGame } from "./hooks/hooks";

import "./App.css";

function App() {
  const {
    hasGameStarted,
    isGamePaused,
    isGameStopped,
    snakePosition,
    foodPosition,
    swipeHandlers,
    setHasGameStarted,
    setIsGamePaused,
  } = useRunGame();

  return (
    <div {...swipeHandlers}>
      <div className="header">
        <span>Score: {snakePosition.length - 1}</span>
        <Controls
          hasGameStarted={hasGameStarted}
          isGamePaused={isGamePaused}
          setHasGameStarted={setHasGameStarted}
          setIsGamePaused={setIsGamePaused}
        />
      </div>
      <div className="gameContainer">
        {isGameStopped && <div className="overlay" />}
        <GameArea
          isGameStopped={isGameStopped}
          snakePosition={snakePosition}
          foodPosition={foodPosition}
        />
      </div>
      <div className="footer">
        Controls: use ←, ↑, →, ↓ buttons or swipe gestures to control the snake
      </div>
    </div>
  );
}

export default App;
