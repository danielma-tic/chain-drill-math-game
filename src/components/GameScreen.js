import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import StartScreen from './StartScreen';
import PlayingScreen from './PlayingScreen';
import CompletedScreen from './CompletedScreen';

const GameScreen = () => {
  const { gameState } = useGameContext();
  
  // Render the appropriate screen based on game state
  switch (gameState) {
    case 'playing':
      return <PlayingScreen />;
    case 'completed':
      return <CompletedScreen />;
    case 'start':
    default:
      return <StartScreen />;
  }
};

export default GameScreen;
