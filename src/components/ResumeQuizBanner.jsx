import React from 'react';
import Button from './Button.jsx';

const ResumeQuizBanner = ({
  onResume,
  onStartNew,
  questionsAnswered,
  totalQuestions
}) => {
  const progressPercentage = Math.round((questionsAnswered / totalQuestions) * 100);

  return (
    <div className="card p-6 mb-8 bg-blue-50 border-blue-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-medium text-blue-900">Quiz in Progress</h3>
          </div>
          
          <p className="text-blue-800 mb-3">
            You have an unfinished quiz with {questionsAnswered} of {totalQuestions} questions completed ({progressPercentage}%).
          </p>
          
          <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="flex space-x-3 ml-6">
          <Button variant="secondary" onClick={onStartNew} size="sm">
            Start New
          </Button>
          <Button onClick={onResume} size="sm">
            Continue Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeQuizBanner;