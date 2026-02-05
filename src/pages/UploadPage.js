import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import QuizSettings from '../components/QuizSettings';
import ResumeQuizBanner from '../components/ResumeQuizBanner';
import { useQuizState } from '../hooks/useQuizState';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    difficulty: 'medium',
    questionTypes: ['mcq'],
    questionCount: 10,
    timeLimit: undefined,
    mode: 'study'
  });
  
  const navigate = useNavigate();
  const { quizState, initializeQuiz, clearQuizState, hasResumeableQuiz } = useQuizState();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleGenerateQuiz = async () => {
    if (!selectedFile && !textContent.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing time and generate mock questions
    setTimeout(() => {
      const mockQuestions = generateMockQuestions(settings);
      initializeQuiz(mockQuestions, settings);
      navigate('/quiz');
    }, 2000);
  };

  const handleResumeQuiz = () => {
    navigate('/quiz');
  };

  const handleStartNewQuiz = () => {
    clearQuizState();
  };

  const generateMockQuestions = (quizSettings) => {
    const baseQuestions = [
      {
        id: '1',
        question: 'What is the primary purpose of React hooks?',
        options: [
          'To replace class components entirely',
          'To allow state and lifecycle features in functional components',
          'To improve performance of React applications',
          'To handle routing in React applications'
        ],
        correctAnswer: 1,
        explanation: 'React hooks were introduced to allow functional components to use state and other React features that were previously only available in class components.',
        wrongAnswerExplanations: [
          'While hooks are popular, they don\'t completely replace class components.',
          'Hooks don\'t directly improve performance, though they can make optimization easier.',
          'Routing is handled by separate libraries like React Router.'
        ],
        difficulty: 'medium',
        type: 'mcq',
        topic: 'react'
      },
      {
        id: '2',
        question: 'Which hook is used to manage component state in functional components?',
        options: [
          'useEffect',
          'useContext',
          'useState',
          'useReducer'
        ],
        correctAnswer: 2,
        explanation: 'useState is the most common hook for managing local component state in functional components.',
        wrongAnswerExplanations: [
          'useEffect is for side effects and lifecycle events.',
          'useContext is for consuming context values.',
          'useReducer is for more complex state management.'
        ],
        difficulty: 'easy',
        type: 'mcq',
        topic: 'react'
      },
      {
        id: '3',
        question: 'What does the useEffect hook primarily handle?',
        options: [
          'State management',
          'Side effects and lifecycle events',
          'Context sharing',
          'Component rendering'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is designed to handle side effects like API calls, subscriptions, and lifecycle events in functional components.',
        wrongAnswerExplanations: [
          'State management is handled by useState or useReducer.',
          'Context sharing uses useContext.',
          'Component rendering is handled by React automatically.'
        ],
        difficulty: 'medium',
        type: 'mcq',
        topic: 'react'
      },
      {
        id: '4',
        question: 'React components must return a single parent element.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'This is false. React components can return multiple elements using React.Fragment or the shorthand <> syntax, or return an array of elements.',
        wrongAnswerExplanations: [
          'While this was true in earlier versions, React now supports fragments and multiple returns.'
        ],
        difficulty: 'easy',
        type: 'true-false',
        topic: 'react'
      },
      {
        id: '5',
        question: 'What is the dependency array in useEffect used for?',
        options: [
          'To pass props to the effect',
          'To control when the effect should run',
          'To define the return value of the effect',
          'To handle errors in the effect'
        ],
        correctAnswer: 1,
        explanation: 'The dependency array controls when useEffect runs by comparing the current values with the previous values.',
        wrongAnswerExplanations: [
          'Props are passed through the component props, not the dependency array.',
          'The return value is defined by the effect function itself.',
          'Error handling is done within the effect function or with error boundaries.'
        ],
        difficulty: 'medium',
        type: 'mcq',
        topic: 'react'
      }
    ];

    // Filter questions based on settings
    let filteredQuestions = baseQuestions.filter(q => 
      quizSettings.questionTypes.includes(q.type)
    );

    // Adjust difficulty if needed
    if (quizSettings.difficulty !== 'medium') {
      filteredQuestions = filteredQuestions.filter(q => 
        q.difficulty === quizSettings.difficulty || q.difficulty === 'medium'
      );
    }

    // Limit to requested count
    return filteredQuestions.slice(0, quizSettings.questionCount);
  };

  const canGenerate = (uploadMethod === 'file' && selectedFile) || 
                     (uploadMethod === 'text' && textContent.trim().length > 0);

  if (isProcessing) {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <LoadingState 
          title="Generating your quiz..."
          description="We're analyzing your content and creating thoughtful questions. This usually takes 30-60 seconds."
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-neutral-900 mb-4">
          Create a new quiz
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Upload a document or paste your text to generate an interactive quiz
        </p>
      </div>

      {/* Resume Quiz Banner */}
      {hasResumeableQuiz() && quizState && (
        <ResumeQuizBanner
          onResume={handleResumeQuiz}
          onStartNew={handleStartNewQuiz}
          questionsAnswered={Object.keys(quizState.answers).length}
          totalQuestions={quizState.questions.length}
        />
      )}

      {/* Quiz Settings */}
      <div className="mb-8">
        <QuizSettings
          settings={settings}
          onSettingsChange={setSettings}
          isOpen={settingsOpen}
          onToggle={() => setSettingsOpen(!settingsOpen)}
        />
      </div>

      {/* Upload Method Toggle */}
      <div className="flex justify-center mb-8">
        <div className="card p-2 inline-flex">
          <button
            onClick={() => setUploadMethod('file')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              uploadMethod === 'file'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setUploadMethod('text')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              uploadMethod === 'text'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        {uploadMethod === 'file' ? (
          <div>
            <FileUpload onFileSelect={handleFileSelect} />
            {selectedFile && (
              <div className="mt-6 card p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-900">{selectedFile.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card p-6">
            <label htmlFor="text-content" className="block text-sm font-medium text-neutral-700 mb-3">
              Paste your content here
            </label>
            <textarea
              id="text-content"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste your text content here. This could be an article, study notes, documentation, or any text you'd like to create a quiz from..."
              className="w-full h-64 px-4 py-3 border border-neutral-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200"
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm text-neutral-500">
                {textContent.length} characters
              </p>
              {textContent.length > 0 && (
                <button
                  onClick={() => setTextContent('')}
                  className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={handleGenerateQuiz}
          disabled={!canGenerate}
        >
          Generate Quiz
        </Button>
        
        {canGenerate && (
          <p className="text-sm text-neutral-500 mt-4">
            This will create a {settings.mode} quiz with {settings.questionCount} questions
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;