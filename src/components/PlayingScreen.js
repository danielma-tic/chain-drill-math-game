import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { Clock, Award, Check, X } from 'lucide-react';
import Numpad from './Numpad';
import ProgressMap from './ProgressMap';

const PlayingScreen = () => {
  const { 
    drillChain,
    currentDrill,
    userAnswer,
    setUserAnswer,
    handleAnswer,
    formatTime,
    seconds,
    score,
    getCurrentDrill
  } = useGameContext();
  
  const drill = getCurrentDrill();
  
  if (!drill || !drillChain) {
    return <div className="flex justify-center items-center h-screen">טוען...</div>;
  }
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-1">
          <Clock size={16} className="text-gray-500" />
          <span className="text-gray-700 mr-1">{formatTime(seconds)}</span>
        </div>
        <div className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
          {currentDrill} מתוך {drillChain.totalDrills}
        </div>
        <div className="flex items-center space-x-1">
          <Award size={16} className="text-yellow-500" />
          <span className="text-gray-700 mr-1">{score}</span>
        </div>
      </div>
      
      {/* Progress Map */}
      <ProgressMap />
      
      {/* Drill content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-blue-100 p-4 rounded-lg w-full max-w-sm mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">מספר יעד</p>
            <p className="text-2xl font-bold text-blue-600">{drillChain.targetNumber}</p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">תרגיל {drill.id}</h2>
          <p className="text-sm text-gray-500">התשובה תהפוך למספר ההתחלתי בתרגיל הבא</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mb-8">
          <div className="text-center">
            <p className="text-md text-gray-600">התחל עם</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">{drill.startNumber}</p>
            
            <div className="flex items-center justify-center text-2xl font-bold">
              <span>{drill.startNumber}</span>
              <span className="mx-2 text-blue-600">{drill.operation}</span>
              {drill.operand !== null && <span>{drill.operand}</span>}
              <span className="mx-2">=</span>
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-24 text-center border-b-2 border-blue-400 focus:border-blue-600 outline-none text-2xl font-bold"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Numpad */}
      <Numpad onAnswer={handleAnswer} />
    </div>
  );
};

export default PlayingScreen;
