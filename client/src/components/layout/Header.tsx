import React from 'react';
import { Link } from 'wouter';
import { PiggyBank, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <PiggyBank className="text-primary h-6 w-6 mr-2" />
            <h1 className="text-xl font-heading font-bold text-primary-600">Tawfir.AI</h1>
          </a>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-neutral-600 focus:outline-none" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="py-4">
              <h2 className="text-lg font-heading font-bold mb-4">Menu</h2>
              <nav className="space-y-2">
                <Link href="/">
                  <a className="block py-2 px-4 hover:bg-neutral-100 rounded-md">Accueil</a>
                </Link>
                <Link href="/questionnaire">
                  <a className="block py-2 px-4 hover:bg-neutral-100 rounded-md">Simulation</a>
                </Link>
                <Link href="/results">
                  <a className="block py-2 px-4 hover:bg-neutral-100 rounded-md">Résultats</a>
                </Link>
                <Link href="/dashboard">
                  <a className="block py-2 px-4 hover:bg-neutral-100 rounded-md">Tableau de bord</a>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
