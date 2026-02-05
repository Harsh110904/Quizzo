import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard.jsx';
import ProgressDashboard from '../components/ProgressDashboard.jsx';
import { useQuizState } from '../hooks/useQuizState.js';

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizState, updateAnswer, nextQuestion, previousQuestion, updateAdaptiveDifficulty } = useQuizState();
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Redirect if no quiz state
    if (!quizState) {
      navigate('/upload');
    }
  }, [quizState, navigate]);

  if (!quizState) {
    return null; // Will redirect
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const selectedAnswer = quizState.answers[currentQuestion?.id] ?? null;

  const handleAnswerSelect = (answerIndex) => {
    if (!currentQuestion) return;
    
    updateAnswer(currentQuestion.id, answerIndex);
    
    // Update adaptive difficulty
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    updateAdaptiveDifficulty(isCorrect);
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      nextQuestion();
    } else {
      // Quiz completed, navigate to results
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const handleTimeUp = () => {
    // Auto-advance to next question when time runs out
    handleNext();
  };

  // Calculate progress
  const progress = {
    totalQuestions: quizState.questions.length,
    answeredQuestions: Object.keys(quizState.answers).length,
    correctAnswers: Object.entries(quizState.answers).filter(([questionId, answer]) => {
      const question = quizState.questions.find(q => q.id === questionId);
      return question && answer === question.correctAnswer;
    }).length,
    timeSpent: Date.now() - quizState.startTime,
    accuracyByTopic: calculateAccuracyByTopic(),
    averageTimePerQuestion: calculateAverageTimePerQuestion()
  };

  function calculateAccuracyByTopic() {
    const topicStats = {};
    
    Object.entries(quizState.answers).forEach(([questionId, answer]) => {
      const question = quizState.questions.find(q => q.id === questionId);
      if (question && question.topic) {
        if (!topicStats[question.topic]) {
          topicStats[question.topic] = { correct: 0, total: 0 };
        }
        topicStats[question.topic].total++;
        if (answer === question.correctAnswer) {
          topicStats[question.topic].correct++;
        }
      }
    });

    const accuracyByTopic = {};
    Object.entries(topicStats).forEach(([topic, stats]) => {
      accuracyByTopic[topic] = stats.total > 0 ? stats.correct / stats.total : 0;
    });

    return accuracyByTopic;
  }

  function calculateAverageTimePerQuestion() {
    const answeredQuestions = quizState.questions.filter(q => 
      quizState.answers[q.id] !== undefined && q.timeSpent
    );
    
    if (answeredQuestions.length === 0) return 0;
    
    const totalTime = answeredQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
    return totalTime / answeredQuestions.length;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
            {quizState.settings.mode === 'study' ? 'Study Mode' : 'Test Mode'} Quiz
          </h1>
          <p className="text-neutral-600">
            {quizState.settings.mode === 'study' 
              ? 'Take your time and learn as you go'
              : 'Focus and do your best'
            }
          </p>
        </div>
        
        <button
          onClick={() => setShowProgress(!showProgress)}
          className="flex items-center px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {showProgress ? 'Hide Progress' : 'Show Progress'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentQuestion && (
            <QuizCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirst={quizState.currentQuestionIndex === 0}
              isLast={quizState.currentQuestionIndex === quizState.questions.length - 1}
              questionNumber={quizState.currentQuestionIndex + 1}
              totalQuestions={quizState.questions.length}
              mode={quizState.settings.mode}
              adaptiveDifficulty={quizState.adaptiveDifficulty}
              timeLimit={quizState.settings.timeLimit}
              onTimeUp={handleTimeUp}
            />
          )}
        </div>

        {showProgress && (
          <div className="lg:col-span-1">
            <ProgressDashboard progress={progress} />
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-2 mb-4">
          {quizState.questions.map((question, index) => (
            <div
              key={question.id}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === quizState.currentQuestionIndex
                  ? 'bg-neutral-900'
                  : quizState.answers[question.id] !== undefined
                  ? 'bg-neutral-400'
                  : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-neutral-500">
          {Object.keys(quizState.answers).length} of {quizState.questions.length} questions answered
        </p>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="mt-8 text-center">
        <p className="text-xs text-neutral-400">
          Use arrow keys to navigate • Press Enter to select • Press Space for next question
        </p>
      </div>
    </div>
  );
};

export default QuizPage;