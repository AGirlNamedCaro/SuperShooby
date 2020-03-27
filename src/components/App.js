import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"


function App() {
  const [level, setLevel] = useState({});
  const [character, setCharacter] = useState('dude');
  const [bomb, setBomb] = useState(3);
  const [fishNum, setFishNum] = useState(7)
  const [stepX, setStepX] = useState(100)
  const [score, setScore] = useState(15)
  


  return (
    <section id="body">
      <TopBar />
      <Game 
      level={level} setLevel={setLevel} 
      character={character} setCharacter={setCharacter} 
      bomb={bomb} setBomb={setBomb}
      fishNum={fishNum} setFishNum={setFishNum}
      stepX={stepX} setStepX={setStepX}
      score={score} setScore={setScore}
      />
      <GameDesc />     
    </section>
  );
}

export default App;
