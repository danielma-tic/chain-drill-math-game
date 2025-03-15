import React, { useState, useEffect, useRef } from 'react';

const ChainDrillMathGame = () => {
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState(['', '', '']);
  const [feedback, setFeedback] = useState(['', '', '']);
  const [gameComplete, setGameComplete] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLeft, setTimeLeft] = useState(60);
  
  // References for input fields
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  
  // Game data
  const gameSteps = [
    { firstNum: 1, operator: '+', secondNum: 1, expectedResult: 2 },
    { firstNum: 2, operator: '+', secondNum: 4, expectedResult: 6 },
    { firstNum: 6, operator: '+', secondNum: 4, expectedResult: 10 }
  ];
  
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
    const userAnswer = parseInt(userAnswers[index]);
    const expectedAnswer = gameSteps[index].expectedResult;
    
    const newFeedback = [...feedback];
    
    if (userAnswer === expectedAnswer) {
      newFeedback[index] = 'correct';
      if (index < gameSteps.length - 1) {
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
    setGameActive(true);
    setCurrentStep(0);
    setUserAnswers(['', '', '']);
    setFeedback(['', '', '']);
    setGameComplete(false);
    setTimeLeft(60);
    
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
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Game header */}
      <div className="w-full max-w-2xl mb-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">Chain Drill Math Game</h1>
        <p className="text-center text-gray-600 mt-2">
          Solve each equation. The answer becomes the first number in the next equation!
        </p>
      </div>
      
      {/* Game controls */}
      <div className="w-full max-w-2xl flex justify-between mb-6">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Difficulty:</span>
          <select 
            className="border rounded p-1" 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={gameActive}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          onClick={startGame}
        >
          {gameActive ? 'Restart Game' : 'Start Game'}
        </button>
        
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Time:</span>
          <span className={`font-medium ${timeLeft < 10 ? 'text-red-500' : 'text-blue-500'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>
      
      {/* Game board */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 relative">
        {!gameActive && !gameComplete && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Ready to Play?</h2>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full text-lg"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
        
        {gameComplete && (
          <div className="absolute inset-0 bg-blue-100 bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Great Job!</h2>
              <p className="text-blue-700 mb-4">You've completed the chain!</p>
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full text-lg"
                onClick={startGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      
        {/* Game chain visualization */}
        <div className="grid grid-cols-1 gap-10 relative">
          {/* First equation row */}
          <div className="flex items-center justify-center relative">
            <div className="flex items-center">
              <div className="border-2 border-blue-300 rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium">
                1
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                +
              </div>
              <div className="border-2 border-blue-300 rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium">
                1
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                =
              </div>
              <div className={`border-2 ${feedback[0] === 'correct' ? 'bg-green-100 border-green-500' : feedback[0] === 'incorrect' ? 'bg-red-100 border-red-500' : 'border-red-300'} rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium relative`}>
                <input
                  ref={inputRefs[0]}
                  type="text"
                  value={userAnswers[0]}
                  onChange={(e) => handleAnswerChange(0, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 0)}
                  onBlur={() => userAnswers[0] && checkAnswer(0)}
                  className={`w-full h-full text-center bg-transparent focus:outline-none ${currentStep >= 0 ? '' : 'opacity-50'}`}
                  disabled={currentStep !== 0 || !gameActive || feedback[0] === 'correct'}
                  maxLength={2}
                />
                {feedback[0] === 'correct' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrow to next equation */}
            <div className="absolute right-1/4 -bottom-8 w-1/2 border-r-2 border-b-2 border-gray-400 h-6"></div>
            <div className="absolute left-3/4 -bottom-8 w-0 h-0 transform rotate-90">
              <div className="w-3 h-3 border-t-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Second equation row */}
          <div className="flex items-center justify-center relative">
            <div className="flex items-center">
              <div className={`border-2 ${feedback[0] === 'correct' ? 'bg-green-100 border-green-500' : 'border-red-300'} rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium`}>
                {feedback[0] === 'correct' ? '2' : '?'}
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                +
              </div>
              <div className="border-2 border-blue-300 rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium">
                4
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                =
              </div>
              <div className={`border-2 ${feedback[1] === 'correct' ? 'bg-green-100 border-green-500' : feedback[1] === 'incorrect' ? 'bg-red-100 border-red-500' : 'border-red-300'} rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium relative`}>
                <input
                  ref={inputRefs[1]}
                  type="text"
                  value={userAnswers[1]}
                  onChange={(e) => handleAnswerChange(1, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 1)}
                  onBlur={() => userAnswers[1] && checkAnswer(1)}
                  className={`w-full h-full text-center bg-transparent focus:outline-none ${currentStep >= 1 ? '' : 'opacity-50'}`}
                  disabled={currentStep !== 1 || !gameActive || feedback[1] === 'correct'}
                  maxLength={2}
                />
                {feedback[1] === 'correct' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrow to next equation */}
            <div className="absolute right-1/4 -bottom-8 w-1/2 border-r-2 border-b-2 border-gray-400 h-6"></div>
            <div className="absolute left-3/4 -bottom-8 w-0 h-0 transform rotate-90">
              <div className="w-3 h-3 border-t-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Third equation row */}
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`border-2 ${feedback[1] === 'correct' ? 'bg-green-100 border-green-500' : 'border-red-300'} rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium`}>
                {feedback[1] === 'correct' ? '6' : '?'}
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                +
              </div>
              <div className="border-2 border-blue-300 rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium">
                4
              </div>
              <div className="border-2 border-blue-300 rounded-md w-10 h-10 flex items-center justify-center mx-2 text-lg">
                =
              </div>
              <div className={`border-2 ${feedback[2] === 'correct' ? 'bg-green-100 border-green-500' : feedback[2] === 'incorrect' ? 'bg-red-100 border-red-500' : 'border-red-300'} rounded-md w-12 h-12 flex items-center justify-center text-xl font-medium relative`}>
                <input
                  ref={inputRefs[2]}
                  type="text"
                  value={userAnswers[2]}
                  onChange={(e) => handleAnswerChange(2, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 2)}
                  onBlur={() => userAnswers[2] && checkAnswer(2)}
                  className={`w-full h-full text-center bg-transparent focus:outline-none ${currentStep >= 2 ? '' : 'opacity-50'}`}
                  disabled={currentStep !== 2 || !gameActive || feedback[2] === 'correct'}
                  maxLength={2}
                />
                {feedback[2] === 'correct' && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Target indicator */}
        <div className="mt-8 text-center">
          <div className="inline-block border-2 border-blue-500 bg-blue-50 rounded-lg px-4 py-2">
            <span className="text-gray-700 font-medium">Target:</span>
            <span className="ml-2 text-blue-700 font-bold text-xl">10</span>
          </div>
        </div>
      </div>
      
      {/* Game instructions */}
      <div className="w-full max-w-2xl mt-6 bg-gray-100 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-2">How to Play:</h3>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>Solve each equation and enter the answer</li>
          <li>After a correct answer, it will automatically move to the next equation</li>
          <li>The answer to each step becomes the first number of the next equation</li>
          <li>Complete the chain to reach the target number</li>
        </ol>
      </div>
    </div>
  );
};

export default ChainDrillMathGame;