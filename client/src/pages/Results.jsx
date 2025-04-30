"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"

// Mock data for demonstration
const profileResults = {
  clientKnowledge: "Intermediate",
  savingProfile: "Growth-oriented",
  financialProfile: "Stable income",
  investorProfile: "Moderate risk",
  esgSensitivity: "Environmentally conscious",
}

const recommendedAllocation = [
  { name: "Sustainable Equity Fund", percentage: 30, color: "bg-emerald-500" },
  { name: "Green Bond Fund", percentage: 25, color: "bg-emerald-700" },
  { name: "Technology Growth Fund", percentage: 20, color: "bg-blue-500" },
  { name: "Real Estate Investment Trust", percentage: 15, color: "bg-amber-500" },
  { name: "Cash & Equivalents", percentage: 10, color: "bg-gray-400" },
]

const alternativeScenarios = [
  {
    id: 1,
    name: "Conservative Allocation",
    match: 85,
    description: "Lower risk profile with focus on capital preservation",
    allocation: [
      { name: "Government Bonds", percentage: 40, color: "bg-blue-700" },
      { name: "Corporate Bonds", percentage: 25, color: "bg-blue-500" },
      { name: "Dividend Stocks", percentage: 20, color: "bg-emerald-500" },
      { name: "Cash & Equivalents", percentage: 15, color: "bg-gray-400" },
    ],
  },
  {
    id: 2,
    name: "Aggressive Growth",
    match: 75,
    description: "Higher risk profile with focus on capital appreciation",
    allocation: [
      { name: "Technology Stocks", percentage: 40, color: "bg-purple-500" },
      { name: "Emerging Markets", percentage: 25, color: "bg-red-500" },
      { name: "Small Cap Equities", percentage: 20, color: "bg-amber-500" },
      { name: "Commodities", percentage: 10, color: "bg-yellow-500" },
      { name: "Cash & Equivalents", percentage: 5, color: "bg-gray-400" },
    ],
  },
  {
    id: 3,
    name: "Income Focus",
    match: 70,
    description: "Balanced risk profile with focus on regular income",
    allocation: [
      { name: "Dividend Stocks", percentage: 35, color: "bg-emerald-500" },
      { name: "Corporate Bonds", percentage: 30, color: "bg-blue-500" },
      { name: "REITs", percentage: 20, color: "bg-amber-500" },
      { name: "Preferred Shares", percentage: 10, color: "bg-indigo-500" },
      { name: "Cash & Equivalents", percentage: 5, color: "bg-gray-400" },
    ],
  },
]

export default function Results() {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [activeTab, setActiveTab] = useState("list")

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link to="/questionnaire">
            <Button variant="outline" className="mb-4">
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
              Back to Questionnaire
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-emerald-600 mb-2">Your Investment Profile Results</h1>
          <p className="text-gray-600">
            Based on your responses, we've created a personalized investment profile and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Your Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-600">Client Knowledge:</span>
                  <span className="font-medium">{profileResults.clientKnowledge}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saving Profile:</span>
                  <span className="font-medium">{profileResults.savingProfile}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Financial Profile:</span>
                  <span className="font-medium">{profileResults.financialProfile}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Investor Profile:</span>
                  <span className="font-medium">{profileResults.investorProfile}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">ESG Sensitivity:</span>
                  <span className="font-medium">{profileResults.esgSensitivity}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
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
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Full Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Recommended Investment Allocation</CardTitle>
              <CardDescription>Based on your profile, we recommend the following investment allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                  {/* Pie chart visualization */}
                  <div className="relative h-64 w-64 mx-auto">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10"></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-medium text-emerald-600">Allocation</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <ul className="space-y-3">
                    {recommendedAllocation.map((item) => (
                      <li key={item.name} className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Proceed with This Allocation
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Alternative Scenarios</CardTitle>
            <CardDescription>Explore other investment allocations that might suit your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list" active={activeTab === "list"} onClick={() => setActiveTab("list")}>
                  List View
                </TabsTrigger>
                <TabsTrigger value="compare" active={activeTab === "compare"} onClick={() => setActiveTab("compare")}>
                  Compare View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" active={activeTab === "list"}>
                <div className="space-y-4">
                  {alternativeScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedScenario === scenario.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{scenario.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            scenario.match > 80
                              ? "bg-emerald-100 text-emerald-800"
                              : scenario.match > 70
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {scenario.match}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{scenario.description}</p>

                      {selectedScenario === scenario.id && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-3">Allocation Breakdown:</h4>
                          <ul className="space-y-2">
                            {scenario.allocation.map((item) => (
                              <li key={item.name} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                                <span className="flex-1">{item.name}</span>
                                <span className="font-medium">{item.percentage}%</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex justify-end">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              Select This Allocation
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compare" active={activeTab === "compare"}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left font-medium text-gray-600 border">Allocation</th>
                        <th className="p-3 text-center font-medium text-gray-600 border">Recommended</th>
                        {alternativeScenarios.map((scenario) => (
                          <th key={scenario.id} className="p-3 text-center font-medium text-gray-600 border">
                            {scenario.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">Match Score</td>
                        <td className="p-3 border text-center">
                          <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">100%</span>
                        </td>
                        {alternativeScenarios.map((scenario) => (
                          <td key={scenario.id} className="p-3 border text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                scenario.match > 80
                                  ? "bg-emerald-100 text-emerald-800"
                                  : scenario.match > 70
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {scenario.match}%
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Risk Level</td>
                        <td className="p-3 border text-center">Moderate</td>
                        <td className="p-3 border text-center">Low</td>
                        <td className="p-3 border text-center">High</td>
                        <td className="p-3 border text-center">Moderate</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Expected Return</td>
                        <td className="p-3 border text-center">7-9%</td>
                        <td className="p-3 border text-center">4-6%</td>
                        <td className="p-3 border text-center">10-12%</td>
                        <td className="p-3 border text-center">6-8%</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">ESG Focus</td>
                        <td className="p-3 border text-center">High</td>
                        <td className="p-3 border text-center">Medium</td>
                        <td className="p-3 border text-center">Low</td>
                        <td className="p-3 border text-center">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="bg-emerald-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                  <span className="text-emerald-600 font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Review Your Profile</h3>
                <p className="text-sm text-gray-600">
                  Take time to review your profile and investment recommendations.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="bg-emerald-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                  <span className="text-emerald-600 font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Select an Allocation</h3>
                <p className="text-sm text-gray-600">Choose the recommended allocation or one of the alternatives.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="bg-emerald-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Start Investing</h3>
                <p className="text-sm text-gray-600">Begin your investment journey with our guided process.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Continue to Investment
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
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
