import React from 'react';

const AdaptiveDifficultyIndicator = ({
  difficulty,
  className = ''
}) => {
  const getDifficultyLabel = (diff) => {
    if (diff < 0.33) return 'Easier questions ahead';
    if (diff > 0.67) return 'Challenging questions ahead';
    return 'Balanced difficulty';
  };

  const getDifficultyColor = (diff) => {
    if (diff < 0.33) return 'text-green-600';
    if (diff > 0.67) return 'text-orange-600';
    return 'text-blue-600';
  };

  // Only show if difficulty has been adjusted significantly
  if (difficulty >= 0.4 && difficulty <= 0.6) return null;

  return (
    <div className={`flex items-center text-xs ${getDifficultyColor(difficulty)} ${className}`}>
      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {getDifficultyLabel(difficulty)}
    </div>
  );
};

export default AdaptiveDifficultyIndicator;