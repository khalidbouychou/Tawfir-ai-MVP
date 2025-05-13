import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductRecommendation } from '@/types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InvestmentCardProps {
  recommendations: ProductRecommendation[];
  investmentAmount: number;
  onInvestmentAmountChange: (amount: number) => void;
  selectedAccount: string;
  onAccountChange: (account: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  recommendations,
  investmentAmount,
  onInvestmentAmountChange,
  selectedAccount,
  onAccountChange,
  onContinue,
  onBack
}) => {
  // Growth projection data
  const growthData = [
    { name: 'Maintenant', optimistic: investmentAmount, average: investmentAmount },
    { name: '1 an', optimistic: investmentAmount * 1.08, average: investmentAmount * 1.05 },
    { name: '2 ans', optimistic: investmentAmount * 1.08 * 1.08, average: investmentAmount * 1.05 * 1.05 },
    { name: '3 ans', optimistic: investmentAmount * 1.08 * 1.08 * 1.08, average: investmentAmount * 1.05 * 1.05 * 1.05 },
    { name: '4 ans', optimistic: investmentAmount * 1.08 * 1.08 * 1.08 * 1.08, average: investmentAmount * 1.05 * 1.05 * 1.05 * 1.05 },
    { name: '5 ans', optimistic: investmentAmount * 1.08 * 1.08 * 1.08 * 1.08 * 1.08, average: investmentAmount * 1.05 * 1.05 * 1.05 * 1.05 * 1.05 },
  ];

  // Calculate allocation amounts
  const allocationAmounts = recommendations.map(rec => ({
    ...rec,
    amount: (investmentAmount * rec.percentage) / 100
  }));

  return (
    <div>
      <Tabs defaultValue="decision">
        <TabsList className="w-full mb-6 border-b border-neutral-200">
          <TabsTrigger value="decision" className="tab-button">Décision</TabsTrigger>
          <TabsTrigger value="education" className="tab-button">Éducation</TabsTrigger>
          <TabsTrigger value="confirmation" className="tab-button">Confirmation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="decision">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-lg mb-4">Votre investissement aujourd'hui</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Montant d'investissement</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">Dhs</span>
                  <input 
                    type="number" 
                    value={investmentAmount} 
                    onChange={(e) => onInvestmentAmountChange(Number(e.target.value))}
                    className="w-full pl-12 pr-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">Montant suggéré basé sur votre capacité d'épargne mensuelle</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Compte source</label>
                <select 
                  value={selectedAccount}
                  onChange={(e) => onAccountChange(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                >
                  <option value="account1">Compte courant principal (**** 4567)</option>
                  <option value="account2">Compte épargne (**** 7890)</option>
                </select>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Répartition de l'investissement</h4>
                <div className="space-y-3">
                  {allocationAmounts.map((product, index) => (
                    <div 
                      key={product.id}
                      className={`flex justify-between items-center p-2 rounded-md`}
                      style={{ backgroundColor: index === 0 ? 'rgba(49, 130, 206, 0.1)' : 
                                            index === 1 ? 'rgba(56, 178, 172, 0.1)' : 
                                            index === 2 ? 'rgba(128, 90, 213, 0.1)' : 'rgba(160, 174, 192, 0.1)' }}
                    >
                      <span className="text-sm">{product.name}</span>
                      <span className="text-sm font-medium">{product.amount.toFixed(0)} Dhs</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Qu'est-ce qui vous fait hésiter ?</h4>
                  <div className="space-y-2">
                    <label className="custom-radio">
                      <input type="radio" name="hesitation" className="custom-radio-input" />
                      <span className="text-sm">Je souhaite approfondir mes connaissances</span>
                    </label>
                    <label className="custom-radio">
                      <input type="radio" name="hesitation" className="custom-radio-input" />
                      <span className="text-sm">Je préfère commencer avec un montant plus faible</span>
                    </label>
                    <label className="custom-radio">
                      <input type="radio" name="hesitation" className="custom-radio-input" />
                      <span className="text-sm">J'aimerais des options moins risquées</span>
                    </label>
                    <label className="custom-radio">
                      <input type="radio" name="hesitation" className="custom-radio-input" />
                      <span className="text-sm">Je ne suis pas sûr(e) du moment</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-lg mb-4">Comprendre votre investissement</h3>
              
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Simulation de croissance</h4>
                <p className="text-sm text-neutral-600 mb-3">Votre investissement de {investmentAmount} Dhs selon les projections :</p>
                
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${Number(value).toFixed(0)} Dhs`]} />
                      <Line 
                        type="monotone" 
                        dataKey="optimistic" 
                        name="Projection optimiste" 
                        stroke="#48BB78" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        name="Projection moyenne" 
                        stroke="#3182CE" 
                        strokeWidth={2} 
                        dot={{ r: 3 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                {recommendations.slice(0, 2).map(product => (
                  <div key={product.id} className="border border-neutral-200 rounded-lg p-4">
                    <h4 className="text-base font-medium mb-2">{product.name}</h4>
                    <p className="text-sm text-neutral-600 mb-2">{product.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Rendement moyen annuel :</span>
                      <span className="font-medium">{product.expectedReturn}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-primary-50 rounded-lg">
                <h4 className="text-base font-medium mb-2">Le saviez-vous ?</h4>
                <p className="text-sm text-neutral-600">Investir régulièrement, même de petits montants, peut générer des résultats significatifs à long terme grâce à l'effet des intérêts composés.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="confirmation">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-heading font-semibold text-lg mb-4">Confirmation de l'investissement</h3>
              
              <div className="mb-6">
                <h4 className="text-base font-medium mb-3">Récapitulatif</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Montant total :</span>
                    <span className="text-sm font-medium">{investmentAmount} Dhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Date d'effet :</span>
                    <span className="text-sm font-medium">Immédiat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Compte source :</span>
                    <span className="text-sm font-medium">**** {selectedAccount === 'account1' ? '4567' : '7890'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-500">Frais applicables :</span>
                    <span className="text-sm font-medium">0 Dhs</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="flex justify-between font-medium">
                    <span>Total à débiter :</span>
                    <span>{investmentAmount} Dhs</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="termsCheck" className="custom-checkbox-input" />
                  <label htmlFor="termsCheck" className="text-sm ml-2">J'ai lu et j'accepte les conditions générales d'utilisation</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="confirmCheck" className="custom-checkbox-input" />
                  <label htmlFor="confirmCheck" className="text-sm ml-2">Je confirme ma décision d'investissement</label>
                </div>
              </div>
              
              <div className="mb-6">
                <button 
                  onClick={onContinue} 
                  className="bg-primary text-white font-medium rounded-lg px-6 py-3 w-full shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  Confirmer et investir
                </button>
              </div>
              
              <div className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex">
                  <div className="mr-3 text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Sécurité et confidentialité</h4>
                    <p className="text-xs text-neutral-500">Votre transaction est sécurisée et vos données sont protégées selon notre politique de confidentialité.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        <button 
          onClick={onBack}
          className="bg-white border border-neutral-300 text-neutral-700 rounded-lg px-5 py-2.5 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          Retour aux résultats
        </button>
        <button 
          onClick={onContinue}
          className="bg-primary text-white rounded-lg px-5 py-2.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default InvestmentCard;
