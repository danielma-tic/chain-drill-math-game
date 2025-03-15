import React from 'react';
import { useGameContext } from '../contexts/GameContext';

const ProgressMap = () => {
  const { drillChain, currentDrill } = useGameContext();
  
  if (!drillChain) return null;
  
  const totalDrills = drillChain.totalDrills;
  
  return (
    <div className="py-4 flex justify-center">
      <div className="relative w-full max-w-md h-20">
        {/* Progress Background */}
        <div className="absolute w-full h-3 bg-gray-200 rounded-full top-7"></div>
        
        {/* Progress Fill */}
        <div 
          className="absolute h-3 bg-blue-500 rounded-full top-7 transition-all duration-300 ease-out" 
          style={{ width: `${(currentDrill / totalDrills) * 100}%` }}
        ></div>
        
        {/* All nodes in a single row */}
        {Array.from({ length: totalDrills }).map((_, index) => {
          const position = (index / (totalDrills - 1)) * 100;
          const isCompleted = index + 1 < currentDrill;
          const isCurrent = index + 1 === currentDrill;
          
          return (
            <div 
              key={index} 
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%`, top: '0px' }}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'bg-blue-600 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white ring-2 ring-blue-200' 
                      : 'bg-white border border-gray-300 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              
              {/* Show drill value for specific positions, matching the image */}
              {(index === 0 || index === 4 || index === 8 || index === 14) && (
                <div className="absolute text-xs text-gray-600 font-medium w-16 text-center" style={{ left: '-8px', top: '42px' }}>
                  {index === 0 ? drillChain.drills[0].startNumber : 
                   index === 4 ? drillChain.drills[4].startNumber : 
                   index === 8 ? drillChain.drills[8].startNumber : 
                   drillChain.drills[14]?.startNumber || ''}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Milestone Labels */}
        <div className="absolute top-16 left-0 text-sm text-gray-500">התחלה</div>
        <div className="absolute top-16 left-1/4 transform -translate-x-1/2 text-sm text-gray-500">25%</div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">50%</div>
        <div className="absolute top-16 left-3/4 transform -translate-x-1/2 text-sm text-gray-500">75%</div>
        <div className="absolute top-16 right-0 text-sm text-gray-500">יעד</div>
      </div>
    </div>
  );
};

export default ProgressMap;
