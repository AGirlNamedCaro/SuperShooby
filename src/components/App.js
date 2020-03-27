import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"


function App() {
  const [level, setLevel] = useState({});

  return (
    <section id="body">
      <TopBar />
      <Game level={level} setLevel={setLevel} />
      <GameDesc />     
    </section>
  );
}

export default App;
