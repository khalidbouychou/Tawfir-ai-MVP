import React from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import ProfileCard from '@/components/ui/ProfileCard';
import ResultCard from '@/components/ui/ResultCard';
import { Button } from '@/components/ui/button';
import { UserProfile, ProductRecommendation } from '@/types';

const ResultsPage: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const { data, isLoading, error } = useQuery<{
    profile: UserProfile;
    recommendations: ProductRecommendation[];
  }>({
    queryKey: ['/api/profile/recommendations'],
  });

  const handleInvestmentClick = () => {
    navigate('/investment');
  };

  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-neutral-200 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Analyse de votre profil en cours...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="px-4 py-6">
        <div className="bg-red-50 p-4 rounded-lg mb-6">
          <h3 className="text-red-800 font-medium">Une erreur est survenue</h3>
          <p className="text-sm text-red-600">Impossible de charger vos résultats. Veuillez réessayer.</p>
        </div>
        <Button onClick={() => navigate('/questionnaire')} className="w-full">
          Retour au questionnaire
        </Button>
      </section>
    );
  }

  const { profile, recommendations } = data;
  
  return (
    <section className="px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-heading font-bold text-primary-600 mb-2">Vos résultats</h2>
        <p className="text-neutral-600">Basés sur votre profil d'investisseur</p>
      </div>

      <ProfileCard 
        riskProfile={profile.riskProfile}
        investmentHorizon={profile.investmentHorizon}
        mainObjective={profile.mainObjective}
        esgSensitivity={profile.esgSensitivity}
        compatibilityScore={profile.compatibilityScore}
      />
      
      <ResultCard recommendations={recommendations} />
      
      <div className="mb-6">
        <button className="w-full bg-neutral-100 text-neutral-700 rounded-lg px-5 py-3 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
            <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
          Afficher 5 scénarios alternatifs
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={handleInvestmentClick}
          className="bg-primary text-white font-medium rounded-lg px-6 py-3 w-full shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/70"
        >
          Commencer à investir
        </button>
        <button className="text-primary font-medium hover:underline focus:outline-none">
          Affiner mon profil
        </button>
      </div>
    </section>
  );
};

export default ResultsPage;
