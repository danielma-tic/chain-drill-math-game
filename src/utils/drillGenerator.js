/**
 * Generates a chain of math drills based on the specified difficulty
 * 
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Object} - A drill chain object containing target number and drill array
 */
export const generateDrillChain = (difficulty) => {
  // Define difficulty settings
  const settings = getDifficultySettings(difficulty);
  
  // For development/demo, we'll use a predefined chain
  // In a full implementation, this would generate unique chains
  return getPredefinedChain(difficulty);
};

/**
 * Gets the settings for a specific difficulty level
 * 
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Object} - Difficulty settings
 */
const getDifficultySettings = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return {
        operations: ['+', '-', '×'],
        numberRange: 100,
        allowDecimals: false,
        totalDrills: 10
      };
    case 'medium':
      return {
        operations: ['+', '-', '×', '÷'],
        numberRange: 150,
        allowDecimals: false,
        totalDrills: 15
      };
    case 'hard':
      return {
        operations: ['+', '-', '×', '÷', '²'],
        numberRange: 200,
        allowDecimals: true,
        totalDrills: 15
      };
    default:
      return getDifficultySettings('medium');
  }
};

/**
 * Returns a predefined drill chain for demonstration purposes
 * 
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Object} - Predefined drill chain
 */
const getPredefinedChain = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return {
        targetNumber: 50,
        totalDrills: 10,
        drills: [
          { id: 1, startNumber: 5, operation: '×', operand: 2, correctAnswer: 10 },
          { id: 2, startNumber: 10, operation: '+', operand: 5, correctAnswer: 15 },
          { id: 3, startNumber: 15, operation: '×', operand: 3, correctAnswer: 45 },
          { id: 4, startNumber: 45, operation: '+', operand: 15, correctAnswer: 60 },
          { id: 5, startNumber: 60, operation: '-', operand: 30, correctAnswer: 30 },
          { id: 6, startNumber: 30, operation: '×', operand: 2, correctAnswer: 60 },
          { id: 7, startNumber: 60, operation: '-', operand: 20, correctAnswer: 40 },
          { id: 8, startNumber: 40, operation: '+', operand: 20, correctAnswer: 60 },
          { id: 9, startNumber: 60, operation: '-', operand: 10, correctAnswer: 50 },
          { id: 10, startNumber: 50, operation: '×', operand: 1, correctAnswer: 50 }
        ]
      };
    case 'medium':
      return {
        targetNumber: 64,
        totalDrills: 15,
        drills: [
          { id: 1, startNumber: 5, operation: '×', operand: 3, correctAnswer: 15 },
          { id: 2, startNumber: 15, operation: '+', operand: 7, correctAnswer: 22 },
          { id: 3, startNumber: 22, operation: '÷', operand: 2, correctAnswer: 11 },
          { id: 4, startNumber: 11, operation: '×', operand: 11, correctAnswer: 121 },
          { id: 5, startNumber: 121, operation: '-', operand: 15, correctAnswer: 106 },
          { id: 6, startNumber: 106, operation: '×', operand: 4, correctAnswer: 424 },
          { id: 7, startNumber: 424, operation: '+', operand: 12, correctAnswer: 436 },
          { id: 8, startNumber: 436, operation: '÷', operand: 3, correctAnswer: 145.33 },
          { id: 9, startNumber: 145.33, operation: '+', operand: 145.33, correctAnswer: 290.67 },
          { id: 10, startNumber: 290.67, operation: '-', operand: 6, correctAnswer: 284.67 },
          { id: 11, startNumber: 284.67, operation: '×', operand: 2, correctAnswer: 569.33 },
          { id: 12, startNumber: 569.33, operation: '+', operand: 10, correctAnswer: 579.33 },
          { id: 13, startNumber: 579.33, operation: '÷', operand: 5, correctAnswer: 115.87 },
          { id: 14, startNumber: 115.87, operation: '×', operand: 8, correctAnswer: 926.96 },
          { id: 15, startNumber: 926.96, operation: '-', operand: 862.96, correctAnswer: 64 }
        ]
      };
    case 'hard':
      return {
        targetNumber: 200,
        totalDrills: 15,
        drills: [
          { id: 1, startNumber: 8.5, operation: '×', operand: 2, correctAnswer: 17 },
          { id: 2, startNumber: 17, operation: '+', operand: 13.5, correctAnswer: 30.5 },
          { id: 3, startNumber: 30.5, operation: '²', operand: null, correctAnswer: 930.25 },
          { id: 4, startNumber: 930.25, operation: '÷', operand: 6.5, correctAnswer: 143.12 },
          { id: 5, startNumber: 143.12, operation: '-', operand: 43.12, correctAnswer: 100 },
          { id: 6, startNumber: 100, operation: '×', operand: 1.5, correctAnswer: 150 },
          { id: 7, startNumber: 150, operation: '+', operand: 25.5, correctAnswer: 175.5 },
          { id: 8, startNumber: 175.5, operation: '÷', operand: 3.9, correctAnswer: 45 },
          { id: 9, startNumber: 45, operation: '×', operand: 4, correctAnswer: 180 },
          { id: 10, startNumber: 180, operation: '-', operand: 30, correctAnswer: 150 },
          { id: 11, startNumber: 150, operation: '²', operand: null, correctAnswer: 22500 },
          { id: 12, startNumber: 22500, operation: '÷', operand: 150, correctAnswer: 150 },
          { id: 13, startNumber: 150, operation: '+', operand: 12.5, correctAnswer: 162.5 },
          { id: 14, startNumber: 162.5, operation: '×', operand: 1.2, correctAnswer: 195 },
          { id: 15, startNumber: 195, operation: '+', operand: 5, correctAnswer: 200 }
        ]
      };
    default:
      return getPredefinedChain('medium');
  }
};

/**
 * Calculates the result of a drill based on its operation
 * 
 * @param {number} startNumber - The starting number for the drill
 * @param {string} operation - The operation to perform
 * @param {number|null} operand - The second operand (null for unary operations like square)
 * @returns {number} - The calculated result
 */
export const calculateDrillResult = (startNumber, operation, operand) => {
  switch (operation) {
    case '+':
      return startNumber + operand;
    case '-':
      return startNumber - operand;
    case '×':
      return startNumber * operand;
    case '÷':
      return startNumber / operand;
    case '²':
      return startNumber * startNumber;
    default:
      return startNumber;
  }
};

/**
 * Creates a dynamic drill chain based on difficulty
 * This would be used in a production version to generate unique chains
 * 
 * @param {string} difficulty - The difficulty level
 * @returns {Object} - A generated drill chain
 */
export const createDynamicDrillChain = (difficulty) => {
  const settings = getDifficultySettings(difficulty);
  const drills = [];
  
  // Target number based on difficulty
  let targetNumber;
  switch (difficulty) {
    case 'easy':
      targetNumber = Math.floor(Math.random() * 50) + 30; // 30-80
      break;
    case 'medium':
      targetNumber = Math.floor(Math.random() * 70) + 50; // 50-120
      break;
    case 'hard':
      targetNumber = Math.floor(Math.random() * 100) + 100; // 100-200
      break;
    default:
      targetNumber = 64;
  }
  
  // To be implemented: algorithm to generate a valid chain
  // that leads to the target number
  
  return {
    targetNumber,
    totalDrills: settings.totalDrills,
    drills: drills
  };
};
