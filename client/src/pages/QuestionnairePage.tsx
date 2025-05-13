import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import Steps from '@/components/ui/Steps';
import QuestionnaireCard, { RadioOption, CheckboxOption, Slider, Select } from '@/components/ui/QuestionnaireCard';
import { useQuestionnaireForm } from '@/hooks/useQuestionnaireForm';
import { questionnaireSections } from '@/utils/profileUtils';
import { UserAnswers } from '@/types';

const QuestionnairePage: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { 
    currentStep, 
    totalSteps, 
    currentSection, 
    answers, 
    updateAnswer, 
    goToNextStep, 
    goToPreviousStep, 
    isFirstStep, 
    isLastStep 
  } = useQuestionnaireForm({
    sections: questionnaireSections,
    onComplete: handleComplete
  });
  
  const submitMutation = useMutation({
    mutationFn: async (data: UserAnswers) => {
      return apiRequest('POST', '/api/questionnaire', data);
    }
  });
  
  // Handle form submission on last step
  async function handleComplete(formAnswers: UserAnswers) {
    try {
      await submitMutation.mutateAsync(formAnswers);
      navigate('/results');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  }
  
  // Render appropriate input based on question type
  const renderQuestionInput = (question: any) => {
    const { id, type, options, min, max, leftLabel, rightLabel, placeholder } = question;
    const value = answers[id] || '';
    
    switch (type) {
      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option: any) => (
              <RadioOption
                key={option.value}
                name={id}
                value={option.value}
                label={option.label}
                checked={value === option.value}
                onChange={(e) => updateAnswer(id, e.target.value)}
              />
            ))}
          </div>
        );
        
      case 'checkbox':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {options.map((option: any) => (
              <CheckboxOption
                key={option.value}
                name={id}
                value={option.value}
                label={option.label}
                checked={selectedValues.includes(option.value)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...selectedValues, option.value]
                    : selectedValues.filter(val => val !== option.value);
                  updateAnswer(id, newValue);
                }}
              />
            ))}
          </div>
        );
        
      case 'slider':
        return (
          <Slider
            min={min || 0}
            max={max || 10}
            value={value || (min || 0)}
            onChange={(newValue) => updateAnswer(id, newValue)}
            leftLabel={leftLabel}
            rightLabel={rightLabel}
          />
        );
        
      case 'select':
        return (
          <Select
            name={id}
            options={options}
            value={value}
            onChange={(e) => updateAnswer(id, e.target.value)}
            placeholder={placeholder}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <section className="px-4 py-6">
      <Steps 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        titles={questionnaireSections.map(section => section.title)}
        labels={questionnaireSections.map(section => section.shortTitle)}
      />
      
      <div className="questionnaire-container">
        {currentSection && (
          <QuestionnaireCard title={currentSection.title}>
            {currentSection.questions.map((question) => (
              <div className="mb-6" key={question.id}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {question.question}
                </label>
                {question.description && (
                  <p className="text-sm text-neutral-500 mb-3">{question.description}</p>
                )}
                {renderQuestionInput(question)}
              </div>
            ))}
          </QuestionnaireCard>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={goToPreviousStep}
          className={`bg-white border border-neutral-300 text-neutral-700 rounded-lg px-5 py-2.5 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-300 ${isFirstStep ? 'invisible' : ''}`}
        >
          Précédent
        </button>
        <button 
          onClick={goToNextStep}
          className="bg-primary text-white rounded-lg px-5 py-2.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-300"
          disabled={submitMutation.isPending}
        >
          {isLastStep ? 'Voir les résultats' : 'Suivant'}
        </button>
      </div>
    </section>
  );
};

export default QuestionnairePage;
