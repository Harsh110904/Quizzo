import React, { useState } from 'react';

const AnswerExplanation = ({
  question,
  selectedAnswer,
  isVisible,
  mode
}) => {
  const [showWrongExplanations, setShowWrongExplanations] = useState(false);
  
  if (!isVisible) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;
  const shouldShowExplanation = mode === 'study' || isVisible;

  return (
    <div className="mt-6 card p-6 bg-neutral-50 border-neutral-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
            isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {isCorrect ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h4 className="font-medium text-neutral-900">
            {isCorrect ? 'Correct!' : 'Not quite right'}
          </h4>
        </div>
      </div>

      {shouldShowExplanation && (
        <div className="space-y-4">
          {/* Correct Answer */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Correct Answer:</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-medium flex items-center justify-center mr-3">
                  {String.fromCharCode(65 + question.correctAnswer)}
                </span>
                <span className="text-green-800">{question.options[question.correctAnswer]}</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">Explanation:</p>
            <p className="text-neutral-600 leading-relaxed">{question.explanation}</p>
          </div>

          {/* Wrong Answer Explanations */}
          {question.wrongAnswerExplanations && question.wrongAnswerExplanations.length > 0 && (
            <div>
              <button
                onClick={() => setShowWrongExplanations(!showWrongExplanations)}
                className="flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transition-transform duration-200 ${showWrongExplanations ? 'rotate-90' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Why other options are incorrect
              </button>
              
              {showWrongExplanations && (
                <div className="mt-3 space-y-2">
                  {question.wrongAnswerExplanations.map((explanation, index) => {
                    // Skip the correct answer
                    const optionIndex = index >= question.correctAnswer ? index + 1 : index;
                    if (optionIndex === question.correctAnswer) return null;
                    
                    return (
                      <div key={optionIndex} className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <div>
                            <p className="text-red-800 text-sm font-medium mb-1">
                              {question.options[optionIndex]}
                            </p>
                            <p className="text-red-700 text-sm">{explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerExplanation;