import { useState, useEffect, useRef } from 'react';
import { Check, X, ArrowRight, ArrowLeft } from 'lucide-react';

// Main component for the multi-step Typeform-like questionnaire
export default function TypeformBinaryQuestionnaire() {
  // Sample questions
  const questions = [
    { id: 1, text: "Êtes-vous propriétaire de votre résidence principale ?" },
    { id: 2, text: "Avez-vous déjà réalisé une planification patrimoniale ?" },
    { id: 3, text: "Épargnez-vous régulièrement chaque mois ?" },
    { id: 4, text: "Avez-vous déjà utilisé des dispositifs d'épargne programmée ?" },
    { id: 5, text: "Avez-vous des crédits en cours ?" },
    { id: 6, text: "Disposez-vous de revenus complémentaires autres que votre activité principale ?" }
  ];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const questionRef = useRef(null);
  const completed = currentQuestionIndex >= questions.length;
  
  const handleAnswer = (answer) => {
    // Store the answer
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: answer
    });
    
    // Move to the next question
    if (currentQuestionIndex < questions.length) {
      setDirection('next');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      }, 500);
    }
  };
  
  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection('prev');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsTransitioning(false);
      }, 500);
    }
  };
  
  const restart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };
  
  // Calculate progress percentage
  const progress = (currentQuestionIndex / questions.length) * 100;
  
  // Focus management for accessibility
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentQuestionIndex]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1 text-gray-500">
            {!completed ? `${currentQuestionIndex + 1} of ${questions.length}` : 'Completed'}
          </div>
        </div>
        
        {/* Question container */}
        <div className="min-h-[300px] flex flex-col justify-between">
          {!completed ? (
            <div className={`transition-all duration-500 transform ${isTransitioning ? (direction === 'next' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0') : 'translate-x-0 opacity-100'}`}>
              <h2 
                ref={questionRef} 
                tabIndex={-1}
                className="text-3xl font-bold mb-16 focus:outline-none"
              >
                {questions[currentQuestionIndex].text}
              </h2>
              
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center shadow-md"
                  aria-label="Yes"
                >
                  <Check className="mr-2" size={20} />
                  <span className="text-lg font-medium">Oui</span>
                </button>
                
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 bg-red-400 text-white py-4 px-6 rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center justify-center shadow-md"
                  aria-label="No"
                >
                  <X className="mr-2" size={20} />
                  <span className="text-lg font-medium">Non</span>
                </button>
              </div>
              
              {currentQuestionIndex > 0 && (
                <button
                  onClick={goBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center mt-4"
                  aria-label="Go back to previous question"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  <span>Retour</span>
                </button>
              )}
            </div>
          ) : (
            <div className="fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <Check className="text-green-500" size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Thank you!</h2>
                <p className="text-gray-600 mb-8">
                Vos réponses ont été enregistrées. Voici un résumé de vos réponses :
                </p>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <ul className="space-y-4">
                    {questions.map((question) => (
                      <li key={question.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <span className="text-gray-700">{question.text}</span>
                        <span className={`font-medium ${answers[question.id] ? 'text-blue-500' : 'text-red-500'}`}>
                          {answers[question.id] ? 'Oui' : 'Non'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={restart}
                  className="bg-blue-400 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md flex items-center justify-center mx-auto"
                >
                  <ArrowRight className="mr-2" size={16} />
                  <span>Recommencer</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
