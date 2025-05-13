import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, PieChart, TrendingUp, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <nav className="bg-white shadow-lg fixed bottom-0 w-full border-t border-neutral-200">
      <div className="flex justify-around">
        <Link href="/">
          <a className={`nav-item flex flex-col items-center p-3 focus:outline-none ${isActive('/') ? 'text-primary-500' : 'text-neutral-400'}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Accueil</span>
          </a>
        </Link>
        <Link href="/questionnaire">
          <a className={`nav-item flex flex-col items-center p-3 focus:outline-none ${isActive('/questionnaire') ? 'text-primary-500' : 'text-neutral-400'}`}>
            <PieChart className="h-5 w-5" />
            <span className="text-xs mt-1">Simulation</span>
          </a>
        </Link>
        <Link href="/results">
          <a className={`nav-item flex flex-col items-center p-3 focus:outline-none ${(isActive('/results') || isActive('/investment')) ? 'text-primary-500' : 'text-neutral-400'}`}>
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Résultats</span>
          </a>
        </Link>
        <Link href="/dashboard">
          <a className={`nav-item flex flex-col items-center p-3 focus:outline-none ${isActive('/dashboard') ? 'text-primary-500' : 'text-neutral-400'}`}>
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profil</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
