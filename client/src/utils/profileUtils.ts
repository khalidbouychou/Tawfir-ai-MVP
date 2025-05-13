import { QuestionnaireSection } from '@/types';

// Define the questionnaire sections
export const questionnaireSections: QuestionnaireSection[] = [
  {
    id: 'client-knowledge',
    title: 'Profil Client',
    shortTitle: 'Client',
    questions: [
      {
        id: 'age',
        question: 'Âge',
        type: 'select',
        placeholder: 'Sélectionnez votre âge',
        options: [
          { value: '18-25', label: '18-25 ans' },
          { value: '26-35', label: '26-35 ans' },
          { value: '36-45', label: '36-45 ans' },
          { value: '46-55', label: '46-55 ans' },
          { value: '56+', label: '56 ans et plus' }
        ]
      },
      {
        id: 'gender',
        question: 'Genre',
        type: 'radio',
        options: [
          { value: 'male', label: 'Homme' },
          { value: 'female', label: 'Femme' },
          { value: 'other', label: 'Préfère ne pas préciser' }
        ]
      },
      {
        id: 'familyStatus',
        question: 'Situation familiale',
        type: 'radio',
        options: [
          { value: 'single', label: 'Célibataire' },
          { value: 'couple', label: 'En couple' },
          { value: 'withChildren', label: 'Avec enfant(s)' }
        ]
      },
      {
        id: 'livingArea',
        question: 'Zone d\'habitation',
        type: 'radio',
        options: [
          { value: 'urban', label: 'Urbaine' },
          { value: 'suburban', label: 'Périurbaine' },
          { value: 'rural', label: 'Rurale' }
        ]
      },
      {
        id: 'educationLevel',
        question: 'Niveau d\'études',
        type: 'radio',
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'secondary', label: 'Secondaire' },
          { value: 'higher', label: 'Supérieur' },
          { value: 'professional', label: 'Formation professionnelle' }
        ]
      }
    ]
  },
  {
    id: 'saving-profile',
    title: 'Profil Épargnant',
    shortTitle: 'Épargnant',
    questions: [
      {
        id: 'savingFrequency',
        question: 'Fréquence d\'épargne',
        type: 'radio',
        options: [
          { value: 'never', label: 'Jamais' },
          { value: 'occasional', label: 'Occasionnelle' },
          { value: 'monthly', label: 'Mensuelle' },
          { value: 'automatic', label: 'Automatique' }
        ]
      },
      {
        id: 'investmentHorizon',
        question: 'Horizon d\'investissement',
        type: 'slider',
        min: 0,
        max: 10,
        leftLabel: 'Court terme',
        rightLabel: 'Long terme'
      },
      {
        id: 'financialGoals',
        question: 'Objectifs financiers (sélection multiple)',
        type: 'checkbox',
        options: [
          { value: 'realEstate', label: 'Acquisition immobilière' },
          { value: 'retirement', label: 'Préparation retraite' },
          { value: 'securityFund', label: 'Fonds de sécurité' },
          { value: 'personalProjects', label: 'Projets personnels' }
        ]
      }
    ]
  },
  {
    id: 'financial-profile',
    title: 'Profil Financier',
    shortTitle: 'Financier',
    questions: [
      {
        id: 'monthlyIncome',
        question: 'Revenu mensuel net',
        type: 'radio',
        options: [
          { value: 'less-than-3000', label: 'Moins de 3000 Dhs' },
          { value: '3000-6000', label: '3000-6000 Dhs' },
          { value: 'more-than-6000', label: 'Plus de 6000 Dhs' }
        ]
      },
      {
        id: 'monthlyExpenses',
        question: 'Charges mensuelles fixes',
        type: 'select',
        placeholder: 'Sélectionnez une tranche',
        options: [
          { value: 'less-than-1000', label: 'Moins de 1000 Dhs' },
          { value: '1000-2000', label: '1000-2000 Dhs' },
          { value: '2000-3000', label: '2000-3000 Dhs' },
          { value: '3000-4000', label: '3000-4000 Dhs' },
          { value: 'more-than-4000', label: 'Plus de 4000 Dhs' }
        ]
      },
      {
        id: 'debtRatio',
        question: 'Taux d\'endettement',
        type: 'radio',
        options: [
          { value: 'low', label: 'Faible (moins de 30%)' },
          { value: 'medium', label: 'Modéré (30-45%)' },
          { value: 'high', label: 'Élevé (plus de 45%)' }
        ]
      },
      {
        id: 'riskTolerance',
        question: 'Tolérance au risque',
        description: 'Si votre investissement perd 10% de sa valeur, quelle serait votre réaction ?',
        type: 'radio',
        options: [
          { value: 'sell', label: 'Vendre tout' },
          { value: 'wait', label: 'Attendre' },
          { value: 'buy', label: 'Investir davantage' }
        ]
      }
    ]
  },
  {
    id: 'investor-profile',
    title: 'Profil Investisseur',
    shortTitle: 'Investisseur',
    questions: [
      {
        id: 'investmentExperience',
        question: 'Niveau d\'expérience',
        type: 'radio',
        options: [
          { value: 'beginner', label: 'Débutant - Aucune expérience' },
          { value: 'intermediate', label: 'Intermédiaire - Quelques investissements' },
          { value: 'advanced', label: 'Avancé - Portefeuille diversifié' },
          { value: 'expert', label: 'Expert - Investisseur régulier' }
        ]
      },
      {
        id: 'decisionBehavior',
        question: 'Comportements décisionnels',
        description: 'Comment prenez-vous généralement vos décisions d\'investissement ?',
        type: 'radio',
        options: [
          { value: 'professional', label: 'Sur les conseils de professionnels' },
          { value: 'research', label: 'Après recherches personnelles' },
          { value: 'trends', label: 'En suivant les tendances du marché' },
          { value: 'intuition', label: 'Intuitivement' }
        ]
      },
      {
        id: 'marketReaction',
        question: 'Réactions en situation réelle',
        description: 'Lors d\'une baisse généralisée des marchés, quelle serait votre première réaction ?',
        type: 'radio',
        options: [
          { value: 'panic', label: 'Panique et vente immédiate' },
          { value: 'worry', label: 'Inquiétude mais observation' },
          { value: 'calm', label: 'Calme et patience' },
          { value: 'opportunity', label: 'Opportunité d\'achat' }
        ]
      }
    ]
  },
  {
    id: 'esg-preferences',
    title: 'Préférences ESG',
    shortTitle: 'ESG',
    questions: [
      {
        id: 'environmentalPreference',
        question: 'Environnement',
        description: 'Dans quelle mesure souhaitez-vous exclure les entreprises à fort impact environnemental de votre portefeuille ?',
        type: 'slider',
        min: 0,
        max: 10,
        leftLabel: 'Peu important',
        rightLabel: 'Très important'
      },
      {
        id: 'socialPreference',
        question: 'Social',
        description: 'Quelle importance accordez-vous aux politiques d\'inclusion et d\'équité dans vos choix d\'investissement ?',
        type: 'slider',
        min: 0,
        max: 10,
        leftLabel: 'Peu important',
        rightLabel: 'Très important'
      },
      {
        id: 'governancePreference',
        question: 'Gouvernance',
        description: 'Privilégiez-vous les entreprises avec des pratiques de gouvernance éthiques et transparentes ?',
        type: 'slider',
        min: 0,
        max: 10,
        leftLabel: 'Peu important',
        rightLabel: 'Très important'
      }
    ]
  }
];

// Calculate risk profile based on answers
export const calculateRiskProfile = (answers: any) => {
  // Risk tolerance is the main factor
  const riskTolerance = answers.riskTolerance;
  
  if (riskTolerance === 'sell') {
    return 'Conservateur';
  } else if (riskTolerance === 'wait') {
    return 'Modéré';
  } else {
    return 'Dynamique';
  }
};

// Determine investment horizon based on answers
export const determineInvestmentHorizon = (answers: any) => {
  const horizon = answers.investmentHorizon;
  
  if (horizon <= 3) {
    return 'Court terme (0-3 ans)';
  } else if (horizon <= 7) {
    return 'Moyen terme (3-7 ans)';
  } else {
    return 'Long terme (7+ ans)';
  }
};

// Identify main objective based on answers
export const identifyMainObjective = (answers: any) => {
  const goals = answers.financialGoals;
  
  if (!goals || goals.length === 0) {
    return 'Non spécifié';
  }
  
  // Priority order
  const priorities = ['realEstate', 'retirement', 'securityFund', 'personalProjects'];
  
  for (const priority of priorities) {
    if (goals.includes(priority)) {
      switch (priority) {
        case 'realEstate':
          return 'Achat immobilier';
        case 'retirement':
          return 'Préparation retraite';
        case 'securityFund':
          return 'Fonds de sécurité';
        case 'personalProjects':
          return 'Projets personnels';
      }
    }
  }
  
  return goals[0]; // Fallback to first selected goal
};

// Evaluate ESG sensitivity based on answers
export const evaluateESGSensitivity = (answers: any) => {
  const environmental = answers.environmentalPreference || 0;
  const social = answers.socialPreference || 0;
  const governance = answers.governancePreference || 0;
  
  const average = (environmental + social + governance) / 3;
  
  if (average < 3) {
    return 'Faible';
  } else if (average < 7) {
    return 'Modérée';
  } else {
    return 'Élevée';
  }
};

// Calculate compatibility score
export const calculateCompatibilityScore = (answers: any) => {
  // This would be a more complex algorithm in a real application
  // Simplified for demonstration
  return Math.floor(Math.random() * 15) + 85; // Random score between 85-99
};
