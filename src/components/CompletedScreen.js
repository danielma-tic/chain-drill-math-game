import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { RefreshCw } from 'lucide-react';

const CompletedScreen = () => {
  const { 
    score, 
    startGame, 
    setGameState, 
    history, 
    drillChain,
    formatTime,
    startTime,
    endTime
  } = useGameContext();
  
  if (!drillChain || history.length === 0) {
    return <div className="flex justify-center items-center h-screen">טוען...</div>;
  }
  
  const finalScore = score;
  const timeElapsed = endTime - startTime;
  const formattedTime = formatTime(Math.floor(timeElapsed / 1000));
  const lastDrillAnswer = history.length > 0 ? history[history.length - 1].userAnswer : 0;
  const isTargetMatched = Math.abs(lastDrillAnswer - drillChain.targetNumber) < 0.01;
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">האתגר הושלם!</h1>
        {isTargetMatched ? (
          <p className="text-lg text-green-600 font-medium">כל הכבוד! הגעת למספר היעד!</p>
        ) : (
          <p className="text-lg text-gray-600">השלמת את כל {drillChain.totalDrills} התרגילים!</p>
        )}
      </div>
      
      {/* Completed Journey Map */}
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md mb-2">
        <div className="relative w-full h-32">
          {/* Circular journey map */}
          <svg width="100%" height="100%" viewBox="0 0 200 100" className="absolute inset-0">
            {/* Outer circle */}
            <circle cx="100" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />
            
            {/* Progress circle - full when complete */}
            <circle 
              cx="100" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={isTargetMatched ? "#10B981" : "#3B82F6"} 
              strokeWidth="8" 
              strokeLinecap="round"
              className="animate-completion"
            />
            
            {/* Center display */}
            <circle cx="100" cy="50" r="32" fill="white" stroke="#E5E7EB" strokeWidth="2" />
            
            {/* Target icon in center */}
            <circle cx="100" cy="50" r="20" fill={isTargetMatched ? "#10B981" : "#3B82F6"} />
            <text x="100" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              {isTargetMatched ? "✓" : drillChain.targetNumber}
            </text>
          </svg>
          
          {/* Milestone nodes around the circle with actual values */}
          {Array.from({ length: 5 }).map((_, index) => {
            const angle = (index * 72) * (Math.PI / 180);
            const x = 100 + 45 * Math.cos(angle);
            const y = 50 + 45 * Math.sin(angle);
            const drillIndex = index * 3; // Drills 0, 3, 6, 9, 12
            const value = drillChain.drills[drillIndex].startNumber;
            
            return (
              <div 
                key={index} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(x / 200) * 100}%`, top: `${(y / 100) * 100}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-blue-500 flex items-center justify-center text-blue-600 font-medium">
                  {value}
                </div>
                <div className="absolute top-8 left-0 w-full text-center text-xs text-gray-500 font-medium">
                  #{drillIndex + 1}
                </div>
              </div>
            );
          })}
          
          {/* Final position indicator with actual value */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '10%' }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white font-bold">
              {lastDrillAnswer}
            </div>
            <div className="absolute top-10 left-0 w-full text-center text-xs text-white font-medium bg-blue-600 rounded-md px-1">
              #{drillChain.totalDrills}
            </div>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-2">
          השלמת את המסע המתמטי!
        </p>
      </div>
      
      <div className="bg-blue-100 p-6 rounded-lg w-full max-w-sm">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">המספר הסופי שלך</p>
          <p className={`text-4xl font-bold ${isTargetMatched ? 'text-green-600' : 'text-gray-700'}`}>
            {lastDrillAnswer}
          </p>
        </div>
        
        <div className="flex justify-between text-center">
          <div>
            <p className="text-sm text-gray-600">יעד</p>
            <p className="text-xl font-bold text-blue-600">{drillChain.targetNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">זמן</p>
            <p className="text-xl font-bold text-blue-600">{formattedTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ניקוד</p>
            <p className="text-xl font-bold text-blue-600">{finalScore}/{drillChain.totalDrills + 5}</p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-sm space-y-3">
        <button 
          className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-lg flex items-center justify-center space-x-2"
          onClick={startGame}
        >
          <RefreshCw size={20} />
          <span>שחק שוב</span>
        </button>
        
        <button 
          className="w-full py-3 px-6 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm flex items-center justify-center space-x-2"
          onClick={() => setGameState('start')}
        >
          <span>חזרה לתפריט</span>
        </button>
      </div>
      
      <div className="w-full max-w-sm">
        <p className="text-sm font-medium text-gray-700 mb-2">היסטוריית תרגילים</p>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-h-48 overflow-y-auto">
          {history.map((item) => (
            <div key={item.drillId} className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs ml-2">
                  {item.drillId}
                </span>
                <span className="text-gray-700">
                  {drillChain.drills[item.drillId-1].startNumber} {drillChain.drills[item.drillId-1].operation} {drillChain.drills[item.drillId-1].operand}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`text-${item.isCorrect ? 'green' : 'red'}-600 font-medium`}>{item.userAnswer}</span>
                {!item.isCorrect && (
                  <span className="text-xs text-gray-500 mr-2">({item.correctAnswer})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedScreen;
