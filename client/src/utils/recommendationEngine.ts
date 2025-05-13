import { UserProfile, ProductRecommendation } from '@/types';

// Sample product database
const products: ProductRecommendation[] = [
  {
    id: '1',
    name: 'Livret d\'épargne sécurisé',
    description: 'Faible risque, liquidité élevée',
    riskLevel: 'low',
    percentage: 0,
    expectedReturn: '2-3%'
  },
  {
    id: '2',
    name: 'Fonds d\'investissement diversifié',
    description: 'Risque modéré, croissance stable',
    riskLevel: 'medium',
    percentage: 0,
    expectedReturn: '4-6%'
  },
  {
    id: '3',
    name: 'Plan épargne logement',
    description: 'Spécifique à l\'objectif immobilier',
    riskLevel: 'low',
    percentage: 0,
    expectedReturn: '3-4%'
  },
  {
    id: '4',
    name: 'Actions ESG sélectionnées',
    description: 'Risque plus élevé, impact positif',
    riskLevel: 'high',
    percentage: 0,
    expectedReturn: '6-10%'
  },
  {
    id: '5',
    name: 'Obligations d\'État',
    description: 'Très faible risque, rendement stable',
    riskLevel: 'very_low',
    percentage: 0,
    expectedReturn: '1-2%'
  },
  {
    id: '6',
    name: 'Fonds immobilier OPCI',
    description: 'Exposition au marché immobilier',
    riskLevel: 'medium',
    percentage: 0,
    expectedReturn: '4-7%'
  }
];

// Generate product recommendations based on user profile
export const generateRecommendations = (profile: UserProfile): ProductRecommendation[] => {
  const { riskProfile, investmentHorizon, mainObjective, esgSensitivity } = profile;
  
  let recommendations: ProductRecommendation[] = [];
  
  // Clone products to avoid modifying the original
  const availableProducts = JSON.parse(JSON.stringify(products)) as ProductRecommendation[];
  
  // Basic allocation based on risk profile
  if (riskProfile === 'Conservateur') {
    recommendations = allocateConservative(availableProducts);
  } else if (riskProfile === 'Modéré') {
    recommendations = allocateModerate(availableProducts);
  } else {
    recommendations = allocateDynamic(availableProducts);
  }
  
  // Adjust for investment horizon
  recommendations = adjustForHorizon(recommendations, investmentHorizon);
  
  // Adjust for main objective
  recommendations = adjustForObjective(recommendations, mainObjective);
  
  // Adjust for ESG sensitivity
  recommendations = adjustForESG(recommendations, esgSensitivity);
  
  // Sort by percentage descending
  return recommendations
    .filter(product => product.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);
};

// Conservative allocation (low risk)
const allocateConservative = (products: ProductRecommendation[]): ProductRecommendation[] => {
  const livret = products.find(p => p.id === '1');
  const obligations = products.find(p => p.id === '5');
  const planEpargne = products.find(p => p.id === '3');
  const fondsDiversifie = products.find(p => p.id === '2');
  
  if (livret) livret.percentage = 40;
  if (obligations) obligations.percentage = 30;
  if (planEpargne) planEpargne.percentage = 20;
  if (fondsDiversifie) fondsDiversifie.percentage = 10;
  
  return products;
};

// Moderate allocation (medium risk)
const allocateModerate = (products: ProductRecommendation[]): ProductRecommendation[] => {
  const livret = products.find(p => p.id === '1');
  const fondsDiversifie = products.find(p => p.id === '2');
  const planEpargne = products.find(p => p.id === '3');
  const actionsESG = products.find(p => p.id === '4');
  
  if (livret) livret.percentage = 40;
  if (fondsDiversifie) fondsDiversifie.percentage = 30;
  if (planEpargne) planEpargne.percentage = 20;
  if (actionsESG) actionsESG.percentage = 10;
  
  return products;
};

// Dynamic allocation (high risk)
const allocateDynamic = (products: ProductRecommendation[]): ProductRecommendation[] => {
  const fondsDiversifie = products.find(p => p.id === '2');
  const actionsESG = products.find(p => p.id === '4');
  const fondsImmobilier = products.find(p => p.id === '6');
  const livret = products.find(p => p.id === '1');
  
  if (fondsDiversifie) fondsDiversifie.percentage = 40;
  if (actionsESG) actionsESG.percentage = 30;
  if (fondsImmobilier) fondsImmobilier.percentage = 20;
  if (livret) livret.percentage = 10;
  
  return products;
};

// Adjust allocation based on investment horizon
const adjustForHorizon = (
  products: ProductRecommendation[], 
  horizon: string
): ProductRecommendation[] => {
  // Example: For long term horizons, increase allocation to higher risk products
  if (horizon.includes('Long terme')) {
    const actionsESG = products.find(p => p.id === '4');
    const fondsDiversifie = products.find(p => p.id === '2');
    const livret = products.find(p => p.id === '1');
    
    if (actionsESG && actionsESG.percentage > 0 && livret && livret.percentage >= 10) {
      actionsESG.percentage += 10;
      livret.percentage -= 10;
    }
  }
  
  return products;
};

// Adjust allocation based on main objective
const adjustForObjective = (
  products: ProductRecommendation[], 
  objective: string
): ProductRecommendation[] => {
  if (objective === 'Achat immobilier') {
    const planEpargne = products.find(p => p.id === '3');
    const fondsImmobilier = products.find(p => p.id === '6');
    
    if (planEpargne) {
      // Increase allocation to real estate savings plan
      const addValue = Math.min(20, 
        products.reduce((total, product) => {
          return product.id !== '3' && product.id !== '6' ? total + product.percentage : total;
        }, 0)
      );
      
      if (addValue > 0) {
        // Take proportionally from other products
        products.forEach(product => {
          if (product.id !== '3' && product.id !== '6' && product.percentage > 0) {
            const ratio = product.percentage / 
              products.reduce((total, p) => {
                return p.id !== '3' && p.id !== '6' ? total + p.percentage : total;
              }, 0);
            
            product.percentage = Math.max(0, product.percentage - (addValue * ratio));
          }
        });
        
        planEpargne.percentage += addValue;
        
        // Add some to real estate fund if available
        if (fondsImmobilier && fondsImmobilier.percentage === 0) {
          fondsImmobilier.percentage = 10;
          
          // Take proportionally from other products except plan épargne
          const toReduce = 10;
          products.forEach(product => {
            if (product.id !== '3' && product.id !== '6' && product.percentage > 0) {
              const ratio = product.percentage / 
                products.reduce((total, p) => {
                  return p.id !== '3' && p.id !== '6' ? total + p.percentage : total;
                }, 0);
              
              product.percentage = Math.max(0, product.percentage - (toReduce * ratio));
            }
          });
        }
      }
    }
  }
  
  return products;
};

// Adjust allocation based on ESG sensitivity
const adjustForESG = (
  products: ProductRecommendation[], 
  esgSensitivity: string
): ProductRecommendation[] => {
  if (esgSensitivity === 'Élevée') {
    const actionsESG = products.find(p => p.id === '4');
    
    if (actionsESG) {
      // Increase allocation to ESG actions
      const currentESG = actionsESG.percentage;
      const addValue = Math.min(10, 
        products.reduce((total, product) => {
          return product.id !== '4' ? total + product.percentage : total;
        }, 0)
      );
      
      if (addValue > 0) {
        // Take proportionally from other products
        products.forEach(product => {
          if (product.id !== '4' && product.percentage > 0) {
            const ratio = product.percentage / 
              products.reduce((total, p) => {
                return p.id !== '4' ? total + p.percentage : total;
              }, 0);
            
            product.percentage = Math.max(0, product.percentage - (addValue * ratio));
          }
        });
        
        actionsESG.percentage += addValue;
      }
    }
  }
  
  // Ensure totals add up to 100%
  const total = products.reduce((sum, product) => sum + product.percentage, 0);
  if (total !== 100) {
    const ratio = 100 / total;
    products.forEach(product => {
      product.percentage = Math.round(product.percentage * ratio);
    });
    
    // Fix any rounding issues
    const newTotal = products.reduce((sum, product) => sum + product.percentage, 0);
    if (newTotal !== 100) {
      const diff = 100 - newTotal;
      
      // Find the product with the highest percentage and adjust
      const highest = products.reduce((max, product) => 
        product.percentage > max.percentage ? product : max, products[0]);
      
      highest.percentage += diff;
    }
  }
  
  return products;
};
