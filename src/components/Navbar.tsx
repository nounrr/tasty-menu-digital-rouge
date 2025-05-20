
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-restaurant-dark hover:text-restaurant-red transition-colors">
              Menu
            </Link>
            <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-restaurant-dark hover:text-restaurant-red transition-colors">
              Administration
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-restaurant-dark hover:text-restaurant-red focus:outline-none"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-restaurant-dark hover:text-restaurant-red"
            onClick={() => setIsOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-restaurant-dark hover:text-restaurant-red"
            onClick={() => setIsOpen(false)}
          >
            Administration
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
