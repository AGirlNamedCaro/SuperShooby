import React, { useState } from 'react';
import "./App.css";
import Game from "./Game";
import TopBar from "./TopBar";
import GameDesc from "./GameDesc"
import CreateMap from "./CreateMap";


function App() {
  const [layer, setLayer] = useState({});

  return (
    <section id="body">
      <TopBar />
      <Game passedLayer={layer} setLayer={setLayer} />
      <GameDesc />     
    </section>
  );
}

export default App;
