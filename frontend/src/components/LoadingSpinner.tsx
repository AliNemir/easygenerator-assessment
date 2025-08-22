import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-medium text-darkText">Loading...</p>
          <p className="text-sm text-gray-500 mt-1">Checking authentication status</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner