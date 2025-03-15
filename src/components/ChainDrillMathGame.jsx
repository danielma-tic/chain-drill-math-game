import React, { useState, useEffect, useRef } from 'react';
import { generateDrillChain } from '../utils/drillGenerator';

const ChainDrillMathGame = () => {
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Dynamic game data based on difficulty
  const [drillChain, setDrillChain] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  
  // Initialize game data based on difficulty
  useEffect(() => {
    const newDrillChain = generateDrillChain(difficulty);
    setDrillChain(newDrillChain);
    
    // Initialize empty answers and feedback for each drill
    const totalDrills = newDrillChain.totalDrills;
    setUserAnswers(Array(totalDrills).fill(''));
    setFeedback(Array(totalDrills).fill(''));
    
    // Create refs for each input
    setInputRefs(Array(totalDrills).fill(0).map(() => React.createRef()));
  }, [difficulty]);
  
  // Reset game state when difficulty changes
  useEffect(() => {
    if (gameActive) {
      setGameActive(false);
      setCurrentStep(0);
      setGameComplete(false);
    }
  }, [difficulty]);
  
  // Handle user input
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    
    // Clear feedback when user types
    const newFeedback = [...feedback];
    newFeedback[index] = '';
    setFeedback(newFeedback);
  };
  
  // Check user answer
  const checkAnswer = (index) => {
    if (!drillChain) return;
    
    const userAnswer = parseFloat(userAnswers[index]);
    const drill = drillChain.drills[index];
    const expectedAnswer = drill.correctAnswer;
    
    const newFeedback = [...feedback];
    
    // Using a small tolerance for floating point comparisons
    const isCorrect = Math.abs(userAnswer - expectedAnswer) < 0.01;
    
    if (isCorrect) {
      newFeedback[index] = 'correct';
      if (index < drillChain.totalDrills - 1) {
        setCurrentStep(index + 1);
        // Focus next input after a correct answer
        setTimeout(() => {
          if (inputRefs[index + 1]?.current) {
            inputRefs[index + 1].current.focus();
          }
        }, 300);
      } else {
        setGameComplete(true);
      }
    } else {
      newFeedback[index] = 'incorrect';
    }
    
    setFeedback(newFeedback);
  };
  
  // Start new game
  const startGame = () => {
    if (!drillChain) return;
    
    setGameActive(true);
    setCurrentStep(0);
    setUserAnswers(Array(drillChain.totalDrills).fill(''));
    setFeedback(Array(drillChain.totalDrills).fill(''));
    setGameComplete(false);
    setTimeLeft(difficulty === 'easy' ? 120 : difficulty === 'medium' ? 180 : 240);
    
    // Focus first input
    setTimeout(() => {
      if (inputRefs[0]?.current) {
        inputRefs[0].current.focus();
      }
    }, 100);
  };
  
  // Handle key press
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      checkAnswer(index);
    }
  };
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (gameActive && !gameComplete && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive, gameComplete]);
  
  // Render loading state if drill chain is not yet available
  if (!drillChain) {
    return <div className="container">Loading...</div>;
  }
  
  return (
    <div className="container">
      {/* Game header */}
      <div className="header">
        <h1 className="title">Chain Drill Math Game</h1>
        <p className="subtitle">
          Solve each equation. The answer becomes the first number in the next equation!
        </p>
      </div>
      
      {/* Game controls */}
      <div className="controls">
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={gameActive}
          >
            <option value="easy">Easy (10 drills)</option>
            <option value="medium">Medium (15 drills)</option>
            <option value="hard">Hard (15 drills)</option>
          </select>
        </div>
        
        <button 
          className="btn btn-primary"
          onClick={startGame}
        >
          {gameActive ? 'Restart Game' : 'Start Game'}
        </button>
        
        <div className="timer">
          <span className="timer-label">Time:</span>
          <span className={`timer-value ${timeLeft < 10 ? 'timer-low' : ''}`}>
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      {/* Game board */}
      <div className="game-board">
        {!gameActive && !gameComplete && (
          <div className="overlay">
            <div className="overlay-content">
              <h2 className="overlay-title">Ready to Play?</h2>
              <p>Complete all {drillChain.totalDrills} drills to reach the target number: {drillChain.targetNumber}</p>
              <button 
                className="btn btn-success"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
        
        {gameComplete && (
          <div className="overlay completion-overlay">
            <div className="overlay-content">
              <h2 className="completion-title">Great Job!</h2>
              <p className="completion-message">You've completed the chain!</p>
              <button 
                className="btn btn-primary"
                onClick={startGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      
        {/* Game chain visualization - scrollable for many drills */}
        <div className="chain-container" style={{ maxHeight: '500px', overflowY: 'auto', padding: '1rem' }}>
          <div className="chain">
            {drillChain.drills.map((drill, index) => {
              const isLastDrill = index === drillChain.totalDrills - 1;
              const previousAnswerCorrect = index > 0 ? feedback[index - 1] === 'correct' : true;
              
              return (
                <div key={index}>
                  <div className="equation-row">
                    <div className="equation">
                      <div className={`number-box ${index > 0 && feedback[index - 1] === 'correct' ? 'correct-box' : ''}`}>
                        {index === 0 || previousAnswerCorrect ? drill.startNumber : '?'}
                      </div>
                      <div className="operator-box">
                        {drill.operation}
                      </div>
                      <div className="number-box">
                        {drill.operand !== null ? drill.operand : ''}
                      </div>
                      <div className="operator-box">
                        =
                      </div>
                      <div className={`result-box ${feedback[index] === 'correct' ? 'correct-box' : feedback[index] === 'incorrect' ? 'incorrect-box' : ''}`}>
                        <input
                          ref={inputRefs[index]}
                          type="text"
                          value={userAnswers[index]}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, index)}
                          onBlur={() => userAnswers[index] && checkAnswer(index)}
                          className={`answer-input ${currentStep >= index ? '' : 'disabled'}`}
                          disabled={currentStep !== index || !gameActive || feedback[index] === 'correct'}
                          maxLength={6}
                        />
                        {feedback[index] === 'correct' && (
                          <div className="check-mark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Arrow to next equation, except for the last one */}
                    {!isLastDrill && (
                      <>
                        <div className="arrow"></div>
                        <div className="arrow-tip"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Target indicator */}
        <div className="target-container">
          <div className="target-box">
            <span className="target-label">Target:</span>
            <span className="target-value">{drillChain.targetNumber}</span>
          </div>
          <div className="progress-indicator">
            <span className="progress-label">Progress:</span>
            <span className="progress-value">{currentStep} / {drillChain.totalDrills}</span>
          </div>
        </div>
      </div>
      
      {/* Game instructions */}
      <div className="instructions">
        <h3 className="instructions-title">How to Play:</h3>
        <ol className="instructions-list">
          <li>Solve each equation and enter the answer</li>
          <li>After a correct answer, it will automatically move to the next equation</li>
          <li>The answer to each step becomes the first number of the next equation</li>
          <li>Complete all {drillChain.totalDrills} steps to reach the target number ({drillChain.targetNumber})</li>
        </ol>
      </div>
    </div>
  );
};

export default ChainDrillMathGame;