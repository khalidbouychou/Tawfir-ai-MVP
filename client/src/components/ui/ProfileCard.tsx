import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartPie, Clock, Target, Leaf } from 'lucide-react';

interface ProfileSummaryProps {
  riskProfile: string;
  investmentHorizon: string;
  mainObjective: string;
  esgSensitivity: string;
  compatibilityScore: number;
}

const ProfileCard: React.FC<ProfileSummaryProps> = ({
  riskProfile,
  investmentHorizon,
  mainObjective,
  esgSensitivity,
  compatibilityScore
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <h3 className="font-heading font-semibold text-lg mb-4">Votre profil d'investisseur</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-neutral-200 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-primary-100 p-2 rounded-full text-primary mb-2">
              <ChartPie className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{riskProfile}</span>
            <span className="text-xs text-neutral-500">Profil de risque</span>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-teal-100 p-2 rounded-full text-teal-500 mb-2">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{investmentHorizon}</span>
            <span className="text-xs text-neutral-500">Horizon d'investissement</span>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-purple-100 p-2 rounded-full text-purple-500 mb-2">
              <Target className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{mainObjective}</span>
            <span className="text-xs text-neutral-500">Objectif principal</span>
          </div>
          <div className="border border-neutral-200 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 p-2 rounded-full text-green-500 mb-2">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{esgSensitivity}</span>
            <span className="text-xs text-neutral-500">Sensibilité ESG</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
          <span className="text-sm font-medium">Compatibilité avec les recommandations</span>
          <span className="text-sm font-bold text-primary-600">{compatibilityScore}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
