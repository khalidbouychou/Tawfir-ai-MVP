import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart } from 'recharts';
import { useResponsiveChart } from '@/hooks/useResponsiveChart';
import { ProductRecommendation } from '@/types';

interface ResultCardProps {
  recommendations: ProductRecommendation[];
}

const ResultCard: React.FC<ResultCardProps> = ({ recommendations }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { containerWidth } = useResponsiveChart(chartRef);
  
  const colors = [
    'hsl(var(--chart-1))', 
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];
  
  const data = recommendations.map((rec, index) => ({
    name: rec.name,
    value: rec.percentage,
    color: colors[index % colors.length]
  }));
  
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <h3 className="font-heading font-semibold text-lg mb-4">Allocation recommandée</h3>
        
        <div className="mb-6 flex justify-center" ref={chartRef}>
          <PieChart width={containerWidth} height={200} data={data} />
        </div>
        
        <div className="space-y-4">
          {recommendations.map((product, index) => (
            <div key={product.id} className={`border-l-4 pl-3`} style={{ borderColor: colors[index % colors.length] }}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-xs text-neutral-500">{product.description}</p>
                </div>
                <span className="font-bold">{product.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
