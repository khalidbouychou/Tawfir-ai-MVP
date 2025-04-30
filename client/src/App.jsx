// src/App.jsx
import React from 'react';
import Questionnaire from './pages/Questionnaire';
import './index.css'; // Ensure Tailwind CSS is imported

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Questionnaire />
    </div>
  );
};

export default App;