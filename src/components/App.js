import React, { useState } from "react";
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc";
import EditMapDesc from "./EditMapDesc";

function App() {
  const [level, setLevel] = useState({});
  const [character, setCharacter] = useState("dude");
  const [bomb, setBomb] = useState(3);
  const [fishNum, setFishNum] = useState(7);
  const [stepX, setStepX] = useState(100);
  const [score, setScore] = useState(15);

  const [gameOver, setGameOver] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameInfo, setGameInfo] = useState("controls");

  const [jump, setJump] = useState(-550);
  const [gravity, setGravity] = useState(300);

  return (
    <section id="body">
      <TopBar />
      <Game
        level={level}
        setLevel={setLevel}
        character={character}
        setCharacter={setCharacter}
        bomb={bomb}
        setBomb={setBomb}
        fishNum={fishNum}
        setFishNum={setFishNum}
        stepX={stepX}
        setStepX={setStepX}
        score={score}
        setScore={setScore}
        gameOver={gameOver}
        setGameOver={setGameOver}
        gameScore={gameScore}
        hiScore={hiScore}
        setGameScore={setGameScore}
        setHiScore={setHiScore}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
        jump={jump}
        setJump={setJump}
        gravity={gravity}
        setGravity={setGravity}
      />
      {gameInfo === "createMapControls" ? (
        <EditMapDesc gameInfo={gameInfo} setGameInfo={setGameInfo} />
      ) : (
        <GameDesc gameInfo={gameInfo} setGameInfo={setGameInfo} />
      )}
    </section>
  );
}

export default App;
