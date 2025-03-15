import React from 'react';
import ChainDrillMathGame from './components/ChainDrillMathGame';
import GameProvider from './contexts/GameContext.jsx';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <ChainDrillMathGame />
      </GameProvider>
    </div>
  );
}

export default App;