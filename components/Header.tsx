import React from 'react';
// Fix: Changed from a type-only import to a value import to allow using enum members like View.Profile.
import { View } from '../types';
import { BookOpenIcon, UserCircleIcon, DocumentTextIcon, MegaphoneIcon, GlobeAltIcon, SunIcon, MoonIcon, type IconProps } from './icons';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  theme: string;
  toggleTheme: () => void;
}

// Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'".
// Fix: Explicitly type icon as React.ReactElement<IconProps> to allow cloning with a className prop.
const navItems: { view: View; label: string; icon: React.ReactElement<IconProps> }[] = [
  { view: View.Profile, label: 'Profile', icon: <UserCircleIcon /> },
  { view: View.Publications, label: 'Publications', icon: <BookOpenIcon /> },
  { view: View.CV, label: 'CV Generator', icon: <DocumentTextIcon /> },
  { view: View.AdPortal, label: 'Ad Portal', icon: <MegaphoneIcon /> },
  { view: View.Directory, label: 'Directory', icon: <GlobeAltIcon /> },
];

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, theme, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0">
              <BookOpenIcon className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight leading-tight">PRECEPTOR</h1>
              <p className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold tracking-wider">FOUNTAIN OF KNOWLEDGE</p>
            </div>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => setActiveView(item.view)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeView === item.view
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                      : 'text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {React.cloneElement(item.icon, { className: 'h-5 w-5' })}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <nav className="flex justify-around py-2">
                 {navItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setActiveView(item.view)}
                        className={`flex flex-col items-center p-2 rounded-lg w-20 transition-colors duration-200 ${
                          activeView === item.view
                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {React.cloneElement(item.icon, { className: 'h-6 w-6 mb-1' })}
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;