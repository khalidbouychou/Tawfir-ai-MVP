import { useState } from 'react';
import { QuestionnaireSection, UserAnswers } from '@/types';

interface UseQuestionnaireFormProps {
  initialStep?: number;
  sections: QuestionnaireSection[];
  onComplete?: (answers: UserAnswers) => void;
}

export const useQuestionnaireForm = ({ 
  initialStep = 1, 
  sections, 
  onComplete 
}: UseQuestionnaireFormProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [answers, setAnswers] = useState<UserAnswers>({});
  
  const totalSteps = sections.length;
  const currentSection = sections[currentStep - 1];
  
  const updateAnswer = (questionId: string, value: string | string[] | number | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // If this is the last step, call onComplete
      onComplete && onComplete(answers);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return {
    currentStep,
    totalSteps,
    currentSection,
    answers,
    updateAnswer,
    goToNextStep,
    goToPreviousStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps
  };
};
