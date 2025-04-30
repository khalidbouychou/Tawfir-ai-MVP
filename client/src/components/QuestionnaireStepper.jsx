import { useState } from 'react';

const questionsPerStep = {
  'Client Knowledge': [
    { id: 'q1', text: 'Quel est votre niveau de connaissance des produits financiers ? (Débutant, Moyen, Expert)' },
    { id: 'q2', text: 'Avez-vous déjà investi en bourse ou dans un produit financier ? (Oui / Non)' },
  ],
  'Saving Profile': [
    { id: 'q3', text: 'Quel est votre montant moyen d’épargne mensuelle ? (ex: 500 MAD)' },
    { id: 'q4', text: 'Préférez-vous une épargne liquide ou bloquée ?' },
  ],
  'Financial Profile': [
    { id: 'q5', text: 'Quel est votre revenu mensuel net approximatif ?' },
    { id: 'q6', text: 'Avez-vous des crédits (immobilier, consommation, etc.) en cours ?' },
  ],
  'Investor Profile': [
    { id: 'q7', text: 'Quel est votre objectif principal ? (Retraite, logement, éducation, etc.)' },
    { id: 'q8', text: 'Comment réagiriez-vous à une perte temporaire de 10% ?' },
  ],
  'ESG Sensitivity': [
    { id: 'q9', text: 'Souhaitez-vous éviter d’investir dans des secteurs comme le tabac, les armes, etc. ?' },
    { id: 'q10', text: 'L’investissement responsable est-il important pour vous ? (Oui / Non)' },
  ],
};

const steps = Object.keys(questionsPerStep);

const QuestionnaireStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const currentQuestions = questionsPerStep[steps[currentStep]];

  return (
    <div className="font-sans max-w-lg w-11/12 mx-auto p-5 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-screen">
      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-red-700 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      {!isCompleted ? (
        <div className="text-center">
          <h2 className="text-2xl text-blue-800 mb-5">{steps[currentStep]}</h2>
          {currentQuestions.map((question) => (
            <div key={question.id} className="mb-4 w-full">
              <label className="block mb-2 text-lg text-gray-700">{question.text}</label>
              <input
                type="text"
                className="w-full p-2 text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
            </div>
          ))}
          <div className="mt-5 flex justify-between w-full">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 text-lg rounded ${
                currentStep === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-800 text-white hover:bg-blue-900'
              }`}
            >
              Retour
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 text-lg rounded bg-blue-800 text-white hover:bg-blue-900"
            >
              {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl text-blue-800 mb-5">Vos réponses :</h2>
          <ul className="list-none p-0">
            {Object.entries(answers).map(([questionId, answer]) => (
              <li key={questionId} className="text-lg text-gray-700 mb-2">
                <strong>{questionId}:</strong> {answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireStepper;