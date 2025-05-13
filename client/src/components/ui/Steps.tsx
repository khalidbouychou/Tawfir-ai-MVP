import React from 'react';

interface StepsProps {
  currentStep: number;
  totalSteps: number;
  titles: string[];
  labels: string[];
}

const Steps: React.FC<StepsProps> = ({ currentStep, totalSteps, titles, labels }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-neutral-600">{titles[currentStep - 1]}</span>
        <span className="text-sm text-neutral-500">Étape {currentStep}/{totalSteps}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="step-indicator mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div 
              key={stepNumber}
              className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              data-step={stepNumber}
            >
              {isCompleted ? '✓' : stepNumber}
              <span className="step-label">{labels[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
