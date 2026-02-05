import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'quizzo-quiz-state';

const defaultSettings = {
  difficulty: 'medium',
  questionTypes: ['mcq'],
  questionCount: 10,
  timeLimit: undefined,
  mode: 'study'
};

export const useQuizState = () => {
  const [quizState, setQuizState] = useState(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setQuizState(parsed);
      } catch (error) {
        console.error('Failed to parse saved quiz state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (quizState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizState));
    }
  }, [quizState]);

  const initializeQuiz = useCallback((questions, settings) => {
    const newState = {
      questions,
      currentQuestionIndex: 0,
      answers: {},
      settings,
      startTime: Date.now(),
      questionStartTime: Date.now(),
      isCompleted: false,
      adaptiveDifficulty: 0.5 // Start at medium difficulty
    };
    setQuizState(newState);
  }, []);

  const updateAnswer = useCallback((questionId, answer) => {
    if (!quizState) return;

    const timeSpent = Date.now() - quizState.questionStartTime;
    const updatedQuestions = quizState.questions.map(q => 
      q.id === questionId ? { ...q, timeSpent } : q
    );

    setQuizState(prev => prev ? {
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      questions: updatedQuestions
    } : null);
  }, [quizState]);

  const nextQuestion = useCallback(() => {
    if (!quizState) return;

    const isLastQuestion = quizState.currentQuestionIndex >= quizState.questions.length - 1;
    
    setQuizState(prev => prev ? {
      ...prev,
      currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
      questionStartTime: Date.now(),
      isCompleted: isLastQuestion
    } : null);
  }, [quizState]);

  const previousQuestion = useCallback(() => {
    if (!quizState) return;

    setQuizState(prev => prev ? {
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
      questionStartTime: Date.now()
    } : null);
  }, [quizState]);

  const updateAdaptiveDifficulty = useCallback((isCorrect) => {
    if (!quizState) return;

    const adjustment = isCorrect ? 0.1 : -0.1;
    const newDifficulty = Math.max(0, Math.min(1, quizState.adaptiveDifficulty + adjustment));

    setQuizState(prev => prev ? {
      ...prev,
      adaptiveDifficulty: newDifficulty
    } : null);
  }, [quizState]);

  const clearQuizState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setQuizState(null);
  }, []);

  const hasResumeableQuiz = useCallback(() => {
    return quizState && !quizState.isCompleted && Object.keys(quizState.answers).length > 0;
  }, [quizState]);

  return {
    quizState,
    initializeQuiz,
    updateAnswer,
    nextQuestion,
    previousQuestion,
    updateAdaptiveDifficulty,
    clearQuizState,
    hasResumeableQuiz,
    defaultSettings
  };
};