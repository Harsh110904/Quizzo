import React, { useState, useEffect } from 'react';
import Button from './Button.jsx';
import AnswerExplanation from './AnswerExplanation.jsx';
import AdaptiveDifficultyIndicator from './AdaptiveDifficultyIndicator.jsx';

const QuizCard = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
  questionNumber,
  totalQuestions,
  mode = 'study',
  adaptiveDifficulty = 0.5,
  timeLimit,
  onTimeUp,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (timeLimit && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            onTimeUp && onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLimit, timeRemaining, onTimeUp]);

  const handleAnswerSelect = (answerIndex) => {
    onAnswerSelect(answerIndex);
    if (mode === 'study') {
      setShowExplanation(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const shouldShowExplanation = showExplanation && selectedAnswer !== null && (mode === 'study' || showResult);

  return (
    <div className="card p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-neutral-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-4">
            {timeLimit && timeRemaining !== null && (
              <div className={`text-sm font-medium ${timeRemaining < 60 ? 'text-red-600' : 'text-neutral-600'}`}>
                {formatTime(timeRemaining)}
              </div>
            )}
            <div className="w-32 bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-neutral-900 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-neutral-900 leading-relaxed mb-4">
          {question.question}
        </h2>

        {adaptiveDifficulty && (
          <AdaptiveDifficultyIndicator 
            difficulty={adaptiveDifficulty} 
            className="mb-4"
          />
        )}
      </div>
      
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          let buttonClasses = 'w-full p-4 text-left border rounded-xl transition-all duration-200 ';
          
          if (showResult) {
            if (index === question.correctAnswer) {
              buttonClasses += 'bg-green-50 border-green-200 text-green-800';
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              buttonClasses += 'bg-red-50 border-red-200 text-red-800';
            } else {
              buttonClasses += 'bg-neutral-50 border-neutral-200 text-neutral-600';
            }
          } else {
            if (index === selectedAnswer) {
              buttonClasses += 'bg-neutral-900 border-neutral-900 text-white';
            } else {
              buttonClasses += 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300';
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={buttonClasses}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      {/* Study Mode Hints */}
      {mode === 'study' && selectedAnswer === null && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center text-blue-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Take your time to think through each option carefully.</span>
          </div>
        </div>
      )}

      {/* Answer Explanation */}
      <AnswerExplanation
        question={question}
        selectedAnswer={selectedAnswer}
        isVisible={shouldShowExplanation}
        mode={mode}
      />
      
      <div className="flex justify-between mt-6">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={isFirst}
          className={isFirst ? 'invisible' : ''}
        >
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
        >
          {isLast ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;