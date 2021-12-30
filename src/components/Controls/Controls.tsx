import { Button } from "../index";

type Props = {
  hasGameStarted: boolean;
  isGamePaused: boolean;
  setHasGameStarted: (hasGameStarted: boolean) => void;
  setIsGamePaused: (isGamePaused: boolean) => void;
};

function Controls({
  hasGameStarted,
  isGamePaused,
  setHasGameStarted,
  setIsGamePaused,
}: Props) {
  return (
    <>
      {!hasGameStarted && (
        <Button
          label="PLAY"
          onClick={() => {
            setHasGameStarted(true);
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
    </>
  );
}

export default Controls;
