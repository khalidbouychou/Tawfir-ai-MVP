import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardCard from '@/components/ui/DashboardCard';
import { InvestmentPortfolio } from '@/types';

const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<{
    portfolio: InvestmentPortfolio;
  }>({
    queryKey: ['/api/portfolio'],
  });
  
  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }
  
  if (error || !data) {
    return (
      <section className="px-4 py-6">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-red-800 font-medium">Une erreur est survenue</h3>
          <p className="text-sm text-red-600">Impossible de charger votre tableau de bord. Veuillez réessayer.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="px-4 py-6">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-primary-600 mb-2">Tableau de bord</h2>
        <p className="text-neutral-600">Suivi de vos investissements</p>
      </div>

      <DashboardCard portfolio={data.portfolio} />
    </section>
  );
};

export default DashboardPage;
