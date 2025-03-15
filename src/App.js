import React from 'react';
import GameProvider from './contexts/GameContext';
import GameScreen from './components/GameScreen';

function App() {
  return (
    <div className="app min-h-screen">
      <GameProvider>
        <GameScreen />
      </GameProvider>
    </div>
  );
}

export default App;
