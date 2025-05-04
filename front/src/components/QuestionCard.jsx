
const letters = ["A", "B", "C", "D", "E"];

export default function QuestionCard({ step, question, onAnswer }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow-400 text-black px-4"
    >
      <p className="text-xl mb-6">
        <span className="text-sm font-mono">{step} →</span>{" "}
        <span className="font-bold text-2xl">{question.question} ?</span>
      </p>

      <div className="flex flex-col gap-3 mb-4">
        {question.options.map((opt, idx) => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            className="flex items-center justify-start px-4 py-3 bg-yellow-300 border border-black rounded focus:outline-none hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="inline-block bg-black text-white rounded px-2 py-1 mr-3 text-sm">
              {letters[idx]}
            </span>
            {opt}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-800 italic">Press an option to continue</p>
    </motion.div>
  );
}
