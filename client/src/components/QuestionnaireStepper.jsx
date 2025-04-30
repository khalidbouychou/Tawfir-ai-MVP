"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

// Define the questionnaire categories and questions
const questionnaires = [
  {
    id: "client-knowledge",
    title: "Client Knowledge",
    description: "Let's assess your understanding of financial products and markets.",
    questions: [
      {
        id: "ck-1",
        question: "How would you rate your knowledge of financial markets?",
        options: [
          { id: "ck-1-a", label: "Beginner - I have limited knowledge" },
          { id: "ck-1-b", label: "Intermediate - I understand the basics" },
          { id: "ck-1-c", label: "Advanced - I have good understanding of markets" },
          { id: "ck-1-d", label: "Expert - I have professional experience in finance" },
        ],
      },
      {
        id: "ck-2",
        question: "Have you invested in financial products before?",
        options: [
          { id: "ck-2-a", label: "Never" },
          { id: "ck-2-b", label: "Rarely (1-2 times)" },
          { id: "ck-2-c", label: "Occasionally (3-5 times)" },
          { id: "ck-2-d", label: "Regularly (more than 5 times)" },
        ],
      },
    ],
  },
  {
    id: "saving-profile",
    title: "Saving Profile",
    description: "Help us understand your saving habits and goals.",
    questions: [
      {
        id: "sp-1",
        question: "What percentage of your monthly income do you typically save?",
        options: [
          { id: "sp-1-a", label: "Less than 5%" },
          { id: "sp-1-b", label: "5-10%" },
          { id: "sp-1-c", label: "11-20%" },
          { id: "sp-1-d", label: "More than 20%" },
        ],
      },
      {
        id: "sp-2",
        question: "What is your primary saving goal?",
        options: [
          { id: "sp-2-a", label: "Emergency fund" },
          { id: "sp-2-b", label: "Retirement" },
          { id: "sp-2-c", label: "Major purchase (home, car, etc.)" },
          { id: "sp-2-d", label: "Children's education" },
          { id: "sp-2-e", label: "Wealth accumulation" },
        ],
      },
    ],
  },
  {
    id: "financial-profile",
    title: "Financial Profile",
    description: "Tell us about your current financial situation.",
    questions: [
      {
        id: "fp-1",
        question: "What is your current employment status?",
        options: [
          { id: "fp-1-a", label: "Full-time employed" },
          { id: "fp-1-b", label: "Part-time employed" },
          { id: "fp-1-c", label: "Self-employed / Business owner" },
          { id: "fp-1-d", label: "Retired" },
          { id: "fp-1-e", label: "Student" },
          { id: "fp-1-f", label: "Unemployed" },
        ],
      },
      {
        id: "fp-2",
        question: "How stable is your income?",
        options: [
          { id: "fp-2-a", label: "Very stable (fixed salary)" },
          { id: "fp-2-b", label: "Mostly stable with some variations" },
          { id: "fp-2-c", label: "Variable (commission-based, freelance, etc.)" },
          { id: "fp-2-d", label: "Highly unpredictable" },
        ],
      },
    ],
  },
  {
    id: "investor-profile",
    title: "Investor Profile",
    description: "Let's understand your investment preferences and risk tolerance.",
    questions: [
      {
        id: "ip-1",
        question: "How would you describe your risk tolerance when investing?",
        options: [
          { id: "ip-1-a", label: "Conservative - I prefer safety over higher returns" },
          { id: "ip-1-b", label: "Moderate - I can accept some fluctuations for better returns" },
          {
            id: "ip-1-c",
            label: "Aggressive - I can tolerate significant fluctuations for potentially higher returns",
          },
          { id: "ip-1-d", label: "Very aggressive - I seek maximum returns and can handle high volatility" },
        ],
      },
      {
        id: "ip-2",
        question: "What is your preferred investment horizon?",
        options: [
          { id: "ip-2-a", label: "Short-term (less than 1 year)" },
          { id: "ip-2-b", label: "Medium-term (1-5 years)" },
          { id: "ip-2-c", label: "Long-term (5-10 years)" },
          { id: "ip-2-d", label: "Very long-term (more than 10 years)" },
        ],
      },
    ],
  },
  {
    id: "esg-sensitivity",
    title: "ESG Sensitivity",
    description: "Help us understand your preferences regarding Environmental, Social, and Governance factors.",
    questions: [
      {
        id: "esg-1",
        question: "How important are environmental considerations in your investment decisions?",
        options: [
          { id: "esg-1-a", label: "Not important - I focus solely on financial returns" },
          {
            id: "esg-1-b",
            label: "Somewhat important - I prefer environmentally responsible investments if returns are similar",
          },
          {
            id: "esg-1-c",
            label: "Important - I would accept slightly lower returns for environmentally responsible investments",
          },
          {
            id: "esg-1-d",
            label: "Very important - Environmental impact is a primary consideration in my investment decisions",
          },
        ],
      },
      {
        id: "esg-2",
        question: "Are there any industries you would prefer to exclude from your investments for ethical reasons?",
        options: [
          { id: "esg-2-a", label: "None - I have no specific exclusions" },
          { id: "esg-2-b", label: "Tobacco and alcohol" },
          { id: "esg-2-c", label: "Weapons and defense" },
          { id: "esg-2-d", label: "Fossil fuels" },
          { id: "esg-2-e", label: "Multiple industries (tobacco, weapons, fossil fuels, etc.)" },
        ],
      },
    ],
  },
]

export default function Questionnaire() {
  const navigate = useNavigate()
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completed, setCompleted] = useState(false)

  const currentCategory = questionnaires[currentCategoryIndex]
  const currentQuestion = currentCategory?.questions[currentQuestionIndex]

  const totalQuestions = questionnaires.reduce((acc, category) => acc + category.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const handleAnswer = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      // Move to next question in current category
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentCategoryIndex < questionnaires.length - 1) {
      // Move to next category
      setCurrentCategoryIndex(currentCategoryIndex + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Completed all questionnaires
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Move to previous question in current category
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else if (currentCategoryIndex > 0) {
      // Move to last question of previous category
      setCurrentCategoryIndex(currentCategoryIndex - 1)
      setCurrentQuestionIndex(questionnaires[currentCategoryIndex - 1].questions.length - 1)
    }
  }

  const canGoBack = currentQuestionIndex > 0 || currentCategoryIndex > 0
  const isAnswered = currentQuestion && answers[currentQuestion.id]

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-emerald-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-emerald-600">Profile Completed!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for completing all questionnaires. We'll analyze your responses and provide personalized
              investment recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-gray-600">
              Your profile has been created based on your responses to our comprehensive questionnaires. We'll now
              generate personalized investment recommendations tailored to your unique financial situation and
              preferences.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Your Profile Categories:</h3>
              <ul className="space-y-2">
                {questionnaires.map((category) => (
                  <li key={category.id} className="flex items-center">
                    <div className="bg-emerald-100 p-1 rounded-full mr-2">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{category.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate("/results")}>
              View Your Results
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Your progress</span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Category title */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-emerald-600 mb-2">{currentCategory.title}</h2>
          <p className="text-gray-600">{currentCategory.description}</p>
        </div>

        {/* Question card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
            >
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <RadioGroupItem value={option.id} id={option.id} className="text-emerald-600" />
                    <Label htmlFor={option.id} className="ml-2 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={!canGoBack}>
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {currentCategoryIndex === questionnaires.length - 1 &&
              currentQuestionIndex === questionnaires[questionnaires.length - 1].questions.length - 1
                ? "Complete"
                : "Next"}
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </CardFooter>
        </Card>

        {/* Category progress */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>
            Question {currentQuestionIndex + 1} of {currentCategory.questions.length}
          </div>
          <div>
            Category {currentCategoryIndex + 1} of {questionnaires.length}
          </div>
        </div>
      </div>
    </div>
  )
}
