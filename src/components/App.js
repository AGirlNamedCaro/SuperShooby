import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"


function App() {
  const [level, setLevel] = useState({});
  const [character, setCharacter] = useState('dude')


  return (
    <section id="body">
      <TopBar />
      <Game level={level} setLevel={setLevel} character={character} setCharacter={setCharacter} />
      <GameDesc />     
    </section>
  );
}

export default App;
