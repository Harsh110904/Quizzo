import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ProgressDashboard from '../components/ProgressDashboard.jsx';
import AnswerExplanation from '../components/AnswerExplanation.jsx';

const ResultsPage = () => {
  const location = useLocation();
  const state = location.state;

  // Fallback data if no state is provided
  const questions = state?.questions || [];
  const answers = state?.answers || {};

  const correctAnswers = questions.filter(
    question => answers[question.id] === question.correctAnswer
  ).length;

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Calculate detailed progress
  const progress = {
    totalQuestions,
    answeredQuestions: Object.keys(answers).length,
    correctAnswers,
    timeSpent: calculateTotalTime(),
    accuracyByTopic: calculateAccuracyByTopic(),
    averageTimePerQuestion: calculateAverageTimePerQuestion()
  };

  function calculateTotalTime() {
    return questions.reduce((total, question) => {
      return total + (question.timeSpent || 0);
    }, 0);
  }

  function calculateAccuracyByTopic() {
    const topicStats = {};
    
    questions.forEach(question => {
      if (question.topic && answers[question.id] !== undefined) {
        if (!topicStats[question.topic]) {
          topicStats[question.topic] = { correct: 0, total: 0 };
        }
        topicStats[question.topic].total++;
        if (answers[question.id] === question.correctAnswer) {
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
    const questionsWithTime = questions.filter(q => q.timeSpent);
    if (questionsWithTime.length === 0) return 0;
    
    const totalTime = questionsWithTime.reduce((sum, q) => sum + q.timeSpent, 0);
    return totalTime / questionsWithTime.length;
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent work!';
    if (percentage >= 80) return 'Great job!';
    if (percentage >= 70) return 'Good effort!';
    if (percentage >= 60) return 'Not bad, but room for improvement.';
    return 'Keep studying and try again!';
  };

  const getPerformanceInsights = () => {
    const insights = [];
    
    if (percentage >= 90) {
      insights.push({
        type: 'success',
        message: 'Outstanding performance! You have a strong grasp of this material.'
      });
    } else if (percentage >= 70) {
      insights.push({
        type: 'good',
        message: 'Solid understanding with room for minor improvements.'
      });
    } else if (percentage >= 50) {
      insights.push({
        type: 'warning',
        message: 'You understand the basics but should review key concepts.'
      });
    } else {
      insights.push({
        type: 'error',
        message: 'Consider reviewing the material thoroughly before retaking.'
      });
    }

    // Time-based insights
    const avgTimeSeconds = progress.averageTimePerQuestion / 1000;
    if (avgTimeSeconds > 120) {
      insights.push({
        type: 'info',
        message: 'You took your time thinking through each question - great approach for learning!'
      });
    } else if (avgTimeSeconds < 30) {
      insights.push({
        type: 'warning',
        message: 'Quick responses - make sure you\'re reading questions carefully.'
      });
    }

    return insights;
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-900 mb-4">
            No quiz results found
          </h1>
          <p className="text-neutral-600 mb-8">
            It looks like you haven't completed a quiz yet.
          </p>
          <Link to="/upload">
            <Button>Create a Quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  const insights = getPerformanceInsights();

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
      {/* Results Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-neutral-900 mb-8">
          Quiz Results
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Score Card */}
          <div className="card p-8">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(percentage)}`}>
              {percentage}%
            </div>
            <p className="text-lg text-neutral-600 mb-2">
              {correctAnswers} out of {totalQuestions} correct
            </p>
            <p className="text-neutral-700 font-medium">
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Progress Dashboard */}
          <ProgressDashboard progress={progress} />
        </div>
      </div>

      {/* Performance Insights */}
      {insights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Performance Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`card p-4 border-l-4 ${
                  insight.type === 'success' ? 'border-green-500 bg-green-50' :
                  insight.type === 'good' ? 'border-blue-500 bg-blue-50' :
                  insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  insight.type === 'error' ? 'border-red-500 bg-red-50' :
                  'border-neutral-500 bg-neutral-50'
                }`}
              >
                <p className={`text-sm ${
                  insight.type === 'success' ? 'text-green-800' :
                  insight.type === 'good' ? 'text-blue-800' :
                  insight.type === 'warning' ? 'text-yellow-800' :
                  insight.type === 'error' ? 'text-red-800' :
                  'text-neutral-800'
                }`}>
                  {insight.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Results */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          Question Review
        </h2>
        
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium text-neutral-900 flex-1 pr-4">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="flex items-center space-x-3">
                    {question.timeSpent && (
                      <span className="text-xs text-neutral-500">
                        {Math.round(question.timeSpent / 1000)}s
                      </span>
                    )}
                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Correct
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Incorrect
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {question.options.map((option, optionIndex) => {
                    const isUserAnswer = userAnswer === optionIndex;
                    const isCorrectAnswer = question.correctAnswer === optionIndex;
                    
                    let optionClasses = 'p-3 rounded-lg border ';
                    
                    if (isCorrectAnswer) {
                      optionClasses += 'bg-green-50 border-green-200 text-green-800';
                    } else if (isUserAnswer && !isCorrect) {
                      optionClasses += 'bg-red-50 border-red-200 text-red-800';
                    } else {
                      optionClasses += 'bg-neutral-50 border-neutral-200 text-neutral-600';
                    }
                    
                    return (
                      <div key={optionIndex} className={optionClasses}>
                        <div className="flex items-center">
                          <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-medium">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          {option}
                          {isCorrectAnswer && (
                            <span className="ml-auto text-sm font-medium">Correct Answer</span>
                          )}
                          {isUserAnswer && !isCorrect && (
                            <span className="ml-auto text-sm font-medium">Your Answer</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Answer Explanation */}
                <AnswerExplanation
                  question={question}
                  selectedAnswer={userAnswer}
                  isVisible={true}
                  mode="test"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/upload">
            <Button size="lg">
              Create New Quiz
            </Button>
          </Link>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => window.print()}
          >
            Print Results
          </Button>
        </div>
        
        <p className="text-sm text-neutral-500">
          Want to improve your score? Review the explanations above and try again with new content.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;