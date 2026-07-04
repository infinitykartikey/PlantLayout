export const calculateScore = (correctDrops, incorrectDrops) => {
    const CORRECT_DROP_POINTS = 5;
    const INCORRECT_DROP_PENALTY = -1;
  
    return (correctDrops * CORRECT_DROP_POINTS) + 
           (incorrectDrops * INCORRECT_DROP_PENALTY);
  };
  
  export const generateTestSummary = (score, totalQuestions) => {
    const percentage = (score / (totalQuestions * 5)) * 100;
    
    let performance;
    if (percentage >= 90) performance = 'Excellent';
    else if (percentage >= 75) performance = 'Good';
    else if (percentage >= 60) performance = 'Average';
    else performance = 'Needs Improvement';
  
    return {
      score,
      percentage: percentage.toFixed(2),
      performance
    };
  };