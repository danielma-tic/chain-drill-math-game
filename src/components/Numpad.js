import React from 'react';
import { X, Check } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

const Numpad = ({ onAnswer }) => {
  const { userAnswer, setUserAnswer } = useGameContext();
  
  const handleNumberClick = (num) => {
    setUserAnswer(userAnswer + num);
  };
  
  const handleDecimalClick = () => {
    if (!userAnswer.includes('.')) {
      setUserAnswer(userAnswer + '.');
    }
  };
  
  const handleBackspaceClick = () => {
    setUserAnswer(userAnswer.slice(0, -1));
  };
  
  return (
    <div className="p-4 bg-gray-100">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            className="bg-white h-14 rounded-lg text-xl font-medium shadow-sm number"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="bg-white h-14 rounded-lg text-xl font-medium shadow-sm number"
          onClick={handleDecimalClick}
        >
          .
        </button>
        <button
          className="bg-white h-14 rounded-lg text-xl font-medium shadow-sm number"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
        <button
          className="bg-white h-14 rounded-lg text-xl font-medium shadow-sm flex items-center justify-center"
          onClick={handleBackspaceClick}
        >
          <X size={24} />
        </button>
      </div>
      
      <button
        className="w-full py-4 bg-blue-600 text-white font-medium rounded-lg shadow-md flex items-center justify-center space-x-2"
        onClick={onAnswer}
        disabled={userAnswer === ''}
      >
        <Check size={20} />
        <span>שלח תשובה</span>
      </button>
    </div>
  );
};

export default Numpad;
