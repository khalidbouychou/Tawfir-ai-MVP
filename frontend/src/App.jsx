

import { useState } from "react";
import Welcome from './components/Welcome.jsx'
import QuestionnairesStepper from "./components/Questionnaire/Stepper";

export default function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false); // Uncommented

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="container mx-auto h-full">
        {showQuestionnaire ? (
          <QuestionnairesStepper />
        ) : (
          <Welcome onStart={() => setShowQuestionnaire(true)} />
        )}
        {/* <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh </h1> */}
      </div>
    </div>
  );
}

