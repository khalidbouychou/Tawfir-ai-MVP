// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
