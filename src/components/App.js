import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"
import CreateMap from "./CreateMap";


function App() {
  const [gameMode, setgameMode] = useState("game");

  return (
    <section id="body">
      <TopBar />
      {gameMode === "game" ? <Game setGameMode={setgameMode} /> : <CreateMap />}
      <GameDesc />     
    </section>
  );
}

export default App;
