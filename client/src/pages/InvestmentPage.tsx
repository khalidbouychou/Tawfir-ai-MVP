import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import InvestmentCard from '@/components/ui/InvestmentCard';
import { ProductRecommendation } from '@/types';

const InvestmentPage: React.FC = () => {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [selectedAccount, setSelectedAccount] = useState('account1');
  
  const { data, isLoading } = useQuery<{
    recommendations: ProductRecommendation[];
  }>({
    queryKey: ['/api/profile/recommendations'],
  });
  
  const investMutation = useMutation({
    mutationFn: async (investmentData: any) => {
      return await apiRequest('POST', '/api/investments', investmentData);
    },
    onSuccess: () => {
      toast({
        title: "Investissement réussi",
        description: "Votre investissement a été effectué avec succès.",
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast({
        title: "Échec de l'investissement",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });
  
  const handleContinue = () => {
    const investmentData = {
      amount: investmentAmount,
      accountId: selectedAccount,
      allocations: data?.recommendations.map(rec => ({
        productId: rec.id,
        percentage: rec.percentage,
        amount: (investmentAmount * rec.percentage) / 100
      }))
    };
    
    investMutation.mutate(investmentData);
  };
  
  const handleBack = () => {
    navigate('/results');
  };
  
  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-heading font-bold text-primary-600 mb-2">Investir maintenant</h2>
        <p className="text-neutral-600">Passez à l'action avec votre stratégie personnalisée</p>
      </div>

      <InvestmentCard 
        recommendations={data?.recommendations || []}
        investmentAmount={investmentAmount}
        onInvestmentAmountChange={setInvestmentAmount}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
        onContinue={handleContinue}
        onBack={handleBack}
      />
    </section>
  );
};

export default InvestmentPage;
