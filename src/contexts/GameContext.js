import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateDrillChain } from '../utils/drillGenerator';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

const GameProvider = ({ children }) => {
  // Game state
  const [gameState, setGameState] = useState('start'); // start, playing, completed
  const [currentDrill, setCurrentDrill] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState('medium'); // easy, medium, hard
  const [seconds, setSeconds] = useState(0);
  
  // Drill data
  const [drillChain, setDrillChain] = useState(null);
  
  // Generate new drill chain based on difficulty
  useEffect(() => {
    if (gameState === 'start') {
      const newDrillChain = generateDrillChain(difficulty);
      setDrillChain(newDrillChain);
    }
  }, [difficulty, gameState]);
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (gameState !== 'playing' && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameState, seconds]);
  
  const startGame = () => {
    setGameState('playing');
    setCurrentDrill(1);
    setScore(0);
    setHistory([]);
    setSeconds(0);
    setStartTime(new Date());
    
    // Generate a new drill chain
    const newDrillChain = generateDrillChain(difficulty);
    setDrillChain(newDrillChain);
  };
  
  const getCurrentDrill = () => {
    if (!drillChain) return null;
    return drillChain.drills.find(drill => drill.id === currentDrill);
  };
  
  const handleAnswer = () => {
    const drill = getCurrentDrill();
    if (!drill) return;
    
    const numericAnswer = parseFloat(userAnswer);
    // Tolerance for floating point comparisons
    const isCorrect = Math.abs(numericAnswer - drill.correctAnswer) < 0.01;
    
    // Add to history
    setHistory([...history, {
      drillId: currentDrill,
      userAnswer: numericAnswer,
      correctAnswer: drill.correctAnswer,
      isCorrect
    }]);
    
    // Update score
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Clear input and move to next drill
    setUserAnswer('');
    
    if (currentDrill < drillChain.totalDrills) {
      setCurrentDrill(currentDrill + 1);
    } else {
      // Game complete
      setGameState('completed');
      setEndTime(new Date());
      
      // Add bonus if final answer matches target
      if (Math.abs(numericAnswer - drillChain.targetNumber) < 0.01) {
        setScore(score => score + 5 + 1); // +5 bonus, +1 for correct answer
      }
    }
  };
  
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const value = {
    // State
    gameState,
    setGameState,
    currentDrill,
    setCurrentDrill,
    userAnswer,
    setUserAnswer,
    score,
    setScore,
    startTime,
    endTime,
    history,
    difficulty,
    setDifficulty,
    seconds,
    drillChain,
    
    // Methods
    startGame,
    getCurrentDrill,
    handleAnswer,
    formatTime
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
