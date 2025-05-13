import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCcw, PlusCircle, CornerLeftUp, FileText, Share2 } from 'lucide-react';
import { InvestmentPortfolio, ProductAllocation } from '@/types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardCardProps {
  portfolio: InvestmentPortfolio;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ portfolio }) => {
  const { totalAmount, globalPerformance, dailyChange, allocations, performanceData } = portfolio;
  
  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-lg">Vue d'ensemble</h3>
            <button className="text-primary text-sm font-medium flex items-center">
              <RefreshCcw className="h-3 w-3 mr-1" /> Actualiser
            </button>
          </div>
          
          <div className="mb-6">
            <div className="text-center">
              <h4 className="text-3xl font-bold mb-1">{totalAmount.toLocaleString()} Dhs</h4>
              <p className="text-sm text-neutral-500">Montant total investi</p>
            </div>
            
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <span className={`text-lg font-medium ${globalPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {globalPerformance >= 0 ? '+' : ''}{globalPerformance}%
                </span>
                <p className="text-xs text-neutral-500">Performance globale</p>
              </div>
              <div className="text-center">
                <span className={`text-lg font-medium ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {dailyChange >= 0 ? '+' : ''}{dailyChange}%
                </span>
                <p className="text-xs text-neutral-500">Variation journalière</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4 h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} Dhs`]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3182CE"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-heading font-semibold text-lg mb-4">Répartition actuelle</h3>
          
          <div className="space-y-4">
            {allocations.map((allocation: ProductAllocation, index: number) => {
              // Different border colors based on product
              const borderColors = ['border-primary', 'border-teal-500', 'border-purple-500', 'border-neutral-400'];
              const bgColors = ['bg-primary-50', 'bg-neutral-50', 'bg-neutral-50', 'bg-neutral-50'];
              
              return (
                <div 
                  key={allocation.id}
                  className={`flex justify-between items-center p-3 border-l-4 ${borderColors[index % borderColors.length]} ${bgColors[index % bgColors.length]} rounded-r-md`}
                >
                  <div>
                    <h4 className="font-medium">{allocation.name}</h4>
                    <p className="text-xs text-neutral-500">
                      {allocation.amount.toLocaleString()} Dhs 
                      (<span className={allocation.performance >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {allocation.performance >= 0 ? '+' : ''}{allocation.performance}%
                      </span>)
                    </p>
                  </div>
                  <span className="font-bold text-primary-600">{allocation.percentage}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-primary text-white font-medium rounded-lg p-3 shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 flex flex-col items-center">
          <PlusCircle className="mb-1 h-5 w-5" />
          <span className="text-sm">Investir plus</span>
        </button>
        <button className="bg-white border border-primary text-primary font-medium rounded-lg p-3 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 flex flex-col items-center">
          <CornerLeftUp className="mb-1 h-5 w-5" />
          <span className="text-sm">Ajuster</span>
        </button>
        <button className="bg-white border border-neutral-300 text-neutral-700 font-medium rounded-lg p-3 hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 flex flex-col items-center">
          <FileText className="mb-1 h-5 w-5" />
          <span className="text-sm">Exporter</span>
        </button>
        <button className="bg-white border border-neutral-300 text-neutral-700 font-medium rounded-lg p-3 hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 flex flex-col items-center">
          <Share2 className="mb-1 h-5 w-5" />
          <span className="text-sm">Partager</span>
        </button>
      </div>
    </>
  );
};

export default DashboardCard;
