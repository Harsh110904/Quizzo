import React from 'react';

const LoadingState = ({
  title = 'Processing...',
  description = 'This may take a few moments',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 mb-6">
        <div className="w-full h-full border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
      
      <h3 className="text-lg font-medium text-neutral-900 mb-2">
        {title}
      </h3>
      
      <p className="text-neutral-600 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

export default LoadingState;