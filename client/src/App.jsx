import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Questionnaire from "./pages/Questionnaire"
import Results from "./pages/Results"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App
