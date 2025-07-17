import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'orange' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center space-y-4">
      <LoadingSpinner size="lg" color="orange" />
      <p className="text-white text-lg">{message}</p>
    </div>
  </div>
);

export const LoadingCard = ({ message = 'Loading...' }) => (
  <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center space-y-4">
    <LoadingSpinner size="lg" color="orange" />
    <p className="text-white text-lg">{message}</p>
  </div>
);

export const LoadingButton = ({ loading, children, ...props }) => (
  <button
    disabled={loading}
    className={`${props.className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    {...props}
  >
    {loading ? (
      <div className="flex items-center space-x-2">
        <LoadingSpinner size="sm" color="white" />
        <span>Loading...</span>
      </div>
    ) : (
      children
    )}
  </button>
);

export default LoadingSpinner;