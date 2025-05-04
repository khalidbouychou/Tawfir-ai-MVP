import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuestionCard from "./QuestionCard";
import EndModal from "./EndModal";

const questions = [
  {
    id: 1,
    question: "Favorite Color?",
    options: ["red", "bleu", "green"]
  },
  {
    id: 2,
    question: "Preferred Language?",
    options: ["JavaScript", "Python", "Rust"]
  }
];

export default function Form() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showEnd, setShowEnd] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowEnd(true);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!showEnd && (
          <QuestionCard
            key={questions[step].id}
            step={step + 1}
            question={questions[step]}
            onAnswer={handleAnswer}
          />
        )}
      </AnimatePresence>

      <EndModal open={showEnd} answers={answers} />
    </div>
  );
}
