import { useState } from 'react'

const questions = [
  { id: 1, question: 'What is your name?', key: 'name' },
  { id: 2, question: 'What is your email?', key: 'email' },
  { id: 3, question: 'What do you want to achieve?', key: 'goal' },
]

export default function FormFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = e.target.elements.input.value
    setAnswers((prev) => ({ ...prev, [questions[step].key]: input }))
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1)
    } else {
      alert(JSON.stringify({ ...answers, [questions[step].key]: input }, null, 2))
    }
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-xl font-medium mb-4">{questions[step].question}</h2>
      <input
        name="input"
        type="text"
        required
        className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {step === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </form>
  )
}
