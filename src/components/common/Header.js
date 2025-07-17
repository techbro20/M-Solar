import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'clients', label: 'Clients', path: '/clients' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'payments', label: 'Payments', path: '/payments' }
  ];

  return (
    <header className="bg-black shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">M-Solar</h1>
              <p className="text-xs text-gray-400">Solar Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-lg font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                    : 'text-white hover:text-orange-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-white hover:text-orange-400 transition-colors"
              >
                <User size={20} />
                <span>Admin</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-orange-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'text-orange-500'
                      : 'text-white hover:text-orange-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-700 pt-4">
                <button className="w-full text-left text-white hover:text-orange-400 flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left text-white hover:text-orange-400 flex items-center space-x-2 mt-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;