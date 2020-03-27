import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"


function App() {
  const [layer, setLayer] = useState({});
  const [character, setCharacter] = useState('dude')

  return (
    <section id="body">
      <TopBar />
      <Game passedLayer={layer} setLayer={setLayer} passedCharacter={character} setCharacter={setCharacter} />
      <GameDesc />     
    </section>
  );
}

export default App;
