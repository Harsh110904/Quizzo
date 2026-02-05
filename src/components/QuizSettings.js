import React from 'react';

const QuizSettings = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle
}) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const toggleQuestionType = (type) => {
    const currentTypes = settings.questionTypes;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    // Ensure at least one type is selected
    if (newTypes.length > 0) {
      updateSetting('questionTypes', newTypes);
    }
  };

  return (
    <div className="card">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 text-neutral-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium text-neutral-900">Quiz Settings</span>
        </div>
        <svg 
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Quiz Mode
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => updateSetting('mode', 'study')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  settings.mode === 'study'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Study Mode
              </button>
              <button
                onClick={() => updateSetting('mode', 'test')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  settings.mode === 'test'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Test Mode
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              {settings.mode === 'study' 
                ? 'Hints and explanations available during quiz'
                : 'Explanations shown only after completion'
              }
            </p>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Difficulty Level
            </label>
            <div className="flex space-x-2">
              {['easy', 'medium', 'hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => updateSetting('difficulty', difficulty)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors duration-200 ${
                    settings.difficulty === difficulty
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Question Types */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Question Types
            </label>
            <div className="space-y-2">
              {[
                { key: 'mcq', label: 'Multiple Choice' },
                { key: 'true-false', label: 'True/False' },
                { key: 'short-answer', label: 'Short Answer' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.questionTypes.includes(key)}
                    onChange={() => toggleQuestionType(key)}
                    className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-neutral-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Number of Questions: {settings.questionCount}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={settings.questionCount}
              onChange={(e) => updateSetting('questionCount', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>5</span>
              <span>50</span>
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={settings.timeLimit !== undefined}
                onChange={(e) => updateSetting('timeLimit', e.target.checked ? 30 : undefined)}
                className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900 focus:ring-2"
              />
              <span className="ml-3 text-sm font-medium text-neutral-700">Time Limit</span>
            </label>
            
            {settings.timeLimit !== undefined && (
              <div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="10"
                  value={settings.timeLimit}
                  onChange={(e) => updateSetting('timeLimit', parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>10 min</span>
                  <span>{settings.timeLimit} min</span>
                  <span>120 min</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSettings;