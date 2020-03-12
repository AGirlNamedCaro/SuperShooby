import React from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"

function App() {
  return (
    <section id="body">
      <TopBar />
      <Game />
      <GameDesc />     
    </section>
  );
}

export default App;
