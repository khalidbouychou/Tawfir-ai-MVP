import React from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { UserCircle, TrendingUp, Bot, Gift } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const [_, navigate] = useLocation();
  
  const handleStartSimulation = () => {
    navigate('/questionnaire');
  };
  
  return (
    <section className="px-4 py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-heading font-bold text-primary-600 mb-2">Bienvenue chez Tawfir.AI</h2>
        <p className="text-neutral-600">Votre partenaire pour une épargne intelligente</p>
      </div>

      {/* Hero image */}
      <div className="rounded-xl overflow-hidden mb-8 shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
          alt="Planning financier" 
          className="w-full h-auto"
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-start">
            <div className="bg-primary-100 p-3 rounded-full text-primary mr-4">
              <UserCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg">Qui sommes-nous ?</h3>
              <p className="text-sm text-neutral-600">Découvrez notre équipe d'experts financiers et technologiques</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start">
            <div className="bg-teal-100 p-3 rounded-full text-teal-500 mr-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg">Pourquoi épargner ?</h3>
              <p className="text-sm text-neutral-600">Les avantages tangibles à court et long terme</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start">
            <div className="bg-purple-100 p-3 rounded-full text-purple-500 mr-4">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg">Pourquoi Tawfir.AI ?</h3>
              <p className="text-sm text-neutral-600">Notre technologie exclusive et notre approche centrée utilisateur</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-full text-green-500 mr-4">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg">Application gratuite</h3>
              <p className="text-sm text-neutral-600">Une solution complète accessible gratuitement</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Trust indicators */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-sm text-neutral-500">Nos partenaires</span>
        </div>
        <div className="flex justify-center space-x-4">
          <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
          <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
          <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
        </div>
      </div>

      {/* Call-to-action */}
      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={handleStartSimulation}
          className="bg-primary text-white font-medium rounded-lg px-6 py-3 w-full shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/70"
        >
          Démarrer la simulation
        </button>
        <button className="text-primary font-medium hover:underline focus:outline-none">
          Devenir partenaire
        </button>
      </div>
    </section>
  );
};

export default WelcomePage;
