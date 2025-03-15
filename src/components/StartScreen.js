import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import { Zap } from 'lucide-react';

const StartScreen = () => {
  const { startGame, difficulty, setDifficulty, drillChain } = useGameContext();
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 min-h-screen text-right">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Chain Drill</h1>
        <p className="text-lg text-gray-600">פתור 15 תרגילים מתמטיים מקושרים והגע למספר היעד</p>
      </div>
      
      {/* Visual Journey Map Preview */}
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-700 mb-3">המסע המתמטי שלך</p>
        <div className="relative w-full h-24">
          {/* Curved path */}
          <svg width="100%" height="100%" viewBox="0 0 300 80" className="absolute inset-0">
            <path
              d="M 10,40 C 50,10 100,70 150,40 C 200,10 250,70 290,40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10,40 C 50,10 100,70 150,40 C 200,10 250,70 290,40"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset="300"
              className="animate-dash"
            />
          </svg>
          
          {/* Milestone nodes with actual values */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 10 + (i * 70);
            const y = i % 2 === 0 ? 40 : (i === 1 || i === 3) ? 20 : 60;
            
            // Get the appropriate drill index for this milestone
            const drillIndex = i === 0 ? 0 : i === 1 ? 3 : i === 2 ? 7 : i === 3 ? 11 : 14;
            
            // Get the value if drillChain exists, otherwise use placeholder
            const value = drillChain?.drills[drillIndex]?.startNumber || (i * 20 + 5);
            
            return (
              <div key={i} className="absolute" style={{ left: `${(x / 300) * 100}%`, top: `${(y / 80) * 100}%` }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center -ml-4 -mt-4 shadow-md ${
                  i === 0 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-600'
                }`}>
                  {value}
                </div>
                <div className="absolute text-xs font-semibold text-gray-500" style={{ top: '16px', left: '0px', width: '24px', textAlign: 'center' }}>
                  #{drillIndex + 1}
                </div>
              </div>
            );
          })}
          
          {/* Start and goal labels */}
          <div className="absolute text-xs font-medium text-blue-600" style={{ left: '0%', top: '75%' }}>התחלה</div>
          <div className="absolute text-xs font-medium text-blue-600" style={{ left: '91%', top: '75%' }}>יעד</div>
        </div>
      </div>
      
      <div className="bg-blue-100 p-4 rounded-lg w-full max-w-sm">
        <div className="text-center">
          <p className="text-sm text-gray-600">מספר יעד</p>
          <p className="text-4xl font-bold text-blue-600">{drillChain?.targetNumber || 64}</p>
        </div>
      </div>
      
      <div className="w-full max-w-sm">
        <p className="text-sm text-gray-600 mb-2">רמת קושי</p>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            className={`flex-1 py-2 rounded-md text-sm ${difficulty === 'easy' ? 'bg-white shadow font-medium text-blue-600' : 'text-gray-500'}`}
            onClick={() => setDifficulty('easy')}
          >
            קל
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-sm ${difficulty === 'medium' ? 'bg-white shadow font-medium text-blue-600' : 'text-gray-500'}`}
            onClick={() => setDifficulty('medium')}
          >
            בינוני
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-sm ${difficulty === 'hard' ? 'bg-white shadow font-medium text-blue-600' : 'text-gray-500'}`}
            onClick={() => setDifficulty('hard')}
          >
            קשה
          </button>
        </div>
        
        <div className="mt-4 text-xs text-gray-600 space-y-2">
          <p className="font-bold">רמות קושי:</p>
          <div className="bg-white p-2 rounded shadow-sm">
            <p className="font-semibold">קל:</p>
            <p>חיבור, חיסור, כפל | מספרים שלמים עד 100 | 10 תרגילים</p>
          </div>
          <div className="bg-white p-2 rounded shadow-sm">
            <p className="font-semibold">בינוני:</p>
            <p>חיבור, חיסור, כפל, חילוק | מספרים שלמים עד 150 | 15 תרגילים</p>
          </div>
          <div className="bg-white p-2 rounded shadow-sm">
            <p className="font-semibold">קשה:</p>
            <p>כל הפעולות + בריבוע | מספרים עשרוניים עד 200 | 15 תרגילים</p>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full max-w-sm py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-lg flex items-center justify-center space-x-2"
        onClick={startGame}
      >
        <Zap size={20} />
        <span>התחל אתגר</span>
      </button>
      
      <div className="text-xs text-gray-500 text-center max-w-sm">
        <p>פתור את כל התרגילים נכון לצבירת 15 נקודות. קבל 5 נקודות בונוס אם תגיע למספר היעד!</p>
      </div>
    </div>
  );
};

export default StartScreen;
