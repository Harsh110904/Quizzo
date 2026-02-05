import React from 'react';

const ProgressDashboard = ({ progress, className = '' }) => {
  const accuracyPercentage = progress.totalQuestions > 0 
    ? Math.round((progress.correctAnswers / progress.answeredQuestions) * 100) 
    : 0;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getAccuracyColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className={`card p-6 ${className}`}>
      <h3 className="text-lg font-medium text-neutral-900 mb-6">Progress Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Questions Answered */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-neutral-900 mb-1">
            {progress.answeredQuestions}
          </div>
          <div className="text-sm text-neutral-600">Questions</div>
          <div className="text-xs text-neutral-500">
            of {progress.totalQuestions}
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className={`text-2xl font-semibold mb-1 ${getAccuracyColor(accuracyPercentage).split(' ')[0]}`}>
            {accuracyPercentage}%
          </div>
          <div className="text-sm text-neutral-600">Accuracy</div>
          <div className="text-xs text-neutral-500">
            {progress.correctAnswers} correct
          </div>
        </div>

        {/* Time Spent */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-neutral-900 mb-1">
            {formatTime(Math.floor(progress.timeSpent / 1000))}
          </div>
          <div className="text-sm text-neutral-600">Time Spent</div>
          <div className="text-xs text-neutral-500">
            {formatTime(Math.floor(progress.averageTimePerQuestion / 1000))} avg
          </div>
        </div>

        {/* Progress */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-neutral-900 mb-1">
            {Math.round((progress.answeredQuestions / progress.totalQuestions) * 100)}%
          </div>
          <div className="text-sm text-neutral-600">Complete</div>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
            <div 
              className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.answeredQuestions / progress.totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topic Accuracy */}
      {Object.keys(progress.accuracyByTopic).length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-3">Performance by Topic</h4>
          <div className="space-y-3">
            {Object.entries(progress.accuracyByTopic).map(([topic, accuracy]) => (
              <div key={topic} className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 capitalize">{topic}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        accuracy >= 0.8 ? 'bg-green-500' : 
                        accuracy >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${accuracy * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neutral-900 w-10 text-right">
                    {Math.round(accuracy * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 pt-6 border-t border-neutral-200">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Quick Insights</h4>
        <div className="space-y-2 text-sm text-neutral-600">
          {accuracyPercentage >= 90 && (
            <div className="flex items-center text-green-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Excellent performance! You're mastering this material.
            </div>
          )}
          {accuracyPercentage < 60 && progress.answeredQuestions > 3 && (
            <div className="flex items-center text-yellow-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Consider reviewing the material before continuing.
            </div>
          )}
          {progress.averageTimePerQuestion > 120000 && (
            <div className="flex items-center text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Take your time - thorough thinking leads to better understanding.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;