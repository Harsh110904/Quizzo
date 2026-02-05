import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const defaultIcon = (
    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="mb-6">
        {icon || defaultIcon}
      </div>
      
      <h3 className="text-lg font-medium text-neutral-900 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-neutral-600 text-center max-w-sm mb-6">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;