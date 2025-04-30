// src/Questionnaire.jsx
import React, { useState } from 'react';

const Questionnaire = () => {
  const questions = [
    {
      id: 1,
      questionText: 'What is your investment experience?',
      options: ['None', 'Beginner', 'Intermediate', 'Expert']
    },
    {
      id: 2,
      questionText: 'What is your risk tolerance?',
      options: ['Low', 'Medium', 'High']
    },
    {
      id: 3,
      questionText: 'What are your investment goals?',
      options: ['Short-term', 'Long-term', 'Retirement', 'Education']
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recommendations, setRecommendations] = useState([]); // New state for recommendations

  const handleChange = (option) => {
    setUserAnswers({
      ...userAnswers,
      [questions[currentQuestionIndex].id]: option
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Send answers to the backend
      try {
        const response = await fetch('http://localhost:5000/submit-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userAnswers),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Log success message
          setRecommendations(data.recommendations); // Set recommendations from the response
        } else {
          console.error('Error submitting answers');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setIsSubmitted(true); // Set submitted state to true
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg transition-transform transform duration-500 ease-in-out">
        <h2 className="text-2xl font-bold mb-4 text-center">Investment Questionnaire</h2>
        <div className="mb-4">
          <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
        {!isSubmitted ? (
          <div className="question-container">
            <div className="question mb-4">
              <p className="text-lg font-medium">{questions[currentQuestionIndex].questionText}</p>
              <div className="flex flex-col mt-2">
                {questions[currentQuestionIndex].options.map((option) => (
                  <label key={option} className="flex items-center mb-2">
                    <input
                      type="radio"
                      value={option}
                      name={`question${questions[currentQuestionIndex].id}`}
                      onChange={() => handleChange(option)}
                      required
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Your Answers:</h3>
            <ul className="list-disc pl-5">
              {questions.map((question) => (
                <li key={question.id} className="mb-1">
                  <strong>{question.questionText}</strong>: {userAnswers[question.id] || 'No answer'}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mt-4 mb-2">Recommended Products:</h3>
            <ul className="list-disc pl-5">
              {recommendations.length > 0 ? (
                recommendations.map((product, index) => (
                  <li key={index} className="mb-1">
                    {product.name} - {product.description} {/* Adjust based on actual response structure */}
                  </li>
                ))
              ) : (
                <li>No recommendations available.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;