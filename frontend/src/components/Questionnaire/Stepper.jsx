import { useState } from "react";
import { Timeline, Button, Typography } from "@material-tailwind/react";
import { UserCircle, Wallet, ChartSquareBar, Bank, Plant, ArrowLeft, ArrowRight } from "iconoir-react"; // Changed PieChart to ChartSquareBar
import KYCForm from "./Forms/KYCForm";
import SavingsProfileForm from "./Forms/SavingsProfileForm";
import FinancialProfileForm from "./Forms/FinancialProfileForm";
import InvestorProfileForm from "./Forms/InvestorProfileForm";
import ESGPreferencesForm from "./Forms/ESGPreferencesForm";

export default function QuestionnairesStepper() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Connaissance Client",
      icon: <UserCircle className="h-6 w-6" />,
      description: "Informations personnelles et contexte socio-économique"
    },
    {
      title: "Profil Épargnant",
      icon: <Wallet className="h-6 w-6" />,
      description: "Habitudes et objectifs d'épargne"
    },
    {
      title: "Profil Financier",
      icon: <ChartSquareBar className="h-6 w-6" />, // Changed PieChart to ChartSquareBar
      description: "Situation financière et tolérance au risque"
    },
    {
      title: "Profil Investisseur",
      icon: <Bank className="h-6 w-6" />,
      description: "Expérience et comportement d'investissement"
    },
    {
      title: "Préférences ESG",
      icon: <Plant className="h-6 w-6" />,
      description: "Critères environnementaux, sociaux et de gouvernance"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Timeline
        mode="stepper"
        value={step}
        onChange={(val) => setStep(Number(val))}
        className="mb-8 px-4"
      >
        {steps.map((item, index) => (
          <Timeline.Item
            key={index}
            disabled={step < index}
            value={index}
            className="w-full"
          >
            <Timeline.Header className="h-20">
              <Timeline.Separator className="!w-1" />
              <Timeline.Icon className="!w-10 !h-10 bg-white border border-blue-500 p-2">
                {item.icon}
              </Timeline.Icon>
              <div className="flex flex-col ml-4">
                <Typography variant="h6" className="text-blue-gray-900">
                  {item.title}
                </Typography>
                <Typography variant="small" className="text-gray-600 font-normal">
                  {item.description}
                </Typography>
              </div>
            </Timeline.Header>
          </Timeline.Item>
        ))}
      </Timeline>

      <div className="mb-8">
        {step === 0 && <KYCForm />}
        {step === 1 && <SavingsProfileForm />}
        {step === 2 && <FinancialProfileForm />}
        {step === 3 && <InvestorProfileForm />}
        {step === 4 && <ESGPreferencesForm />}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          variant="outlined"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-2 px-6 py-3 transition-all hover:shadow-lg disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Précédent
        </Button>
        <Button
          variant="filled"
          color={step === steps.length - 1 ? "green" : "blue"}
          onClick={() => {
            if (step === steps.length - 1) {
              // Traitement final du questionnaire
              console.log("Questionnaire terminé");
            } else {
              setStep(step + 1);
            }
          }}
          className="flex items-center gap-2 px-6 py-3 transition-all hover:shadow-lg"
        >
          {step === steps.length - 1 ? "Terminer" : "Suivant"}
          {step !== steps.length - 1 && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}