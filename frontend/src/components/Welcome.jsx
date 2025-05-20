import { Button } from "@material-tailwind/react";

export default function Welcome({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-black p-4 sm:p-8 bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="w-full max-w-xl sm:max-w-2xl text-center space-y-4 sm:space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Bienvenue sur Tawfir AI</h1>
        <p className="text-base sm:text-lg mb-6 sm:mb-8">
          Votre assistant intelligent pour la planification financière. Découvrez des stratégies d'épargne personnalisées,
          des conseils d'investissement et des solutions de budgétisation adaptées à vos besoins.
        </p>
        <Button
          size="lg"
          className="bg-amber-600 hover:bg-amber-700 transition-colors px-6 py-3 w-full sm:w-auto"
          onClick={onStart}
        >
          Démarrer le questionnaire
        </Button>
      </div>
    </div>
  );
}