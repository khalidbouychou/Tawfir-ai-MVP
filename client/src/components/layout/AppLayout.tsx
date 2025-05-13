import React, { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { useLocation } from 'wouter';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  
  // Determine if navigation should be shown based on route
  const showNavigation = location !== '/';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-16 pb-20">
        {children}
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default AppLayout;
