import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X as XIcon, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart'; // ✅ Updated import path to Redux hook

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart(); // ✅ Redux state
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-green-800">
            Karen Natural Organics
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-md text-blue-800 hover:bg-blue-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-brown-700 hover:text-green-800 font-medium">
            Home
          </Link>
          <Link to="/products" className="text-brown-700 hover:text-blue-800 font-medium">
            Products
          </Link>
          <Link to="/about" className="text-brown-700 hover:text-blue-800 font-medium">
            About Us
          </Link>
          <Link
            to="/cart"
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Cart
            {itemCount > 0 && (
              <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-sm font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-brown-700 hover:text-green-800 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-brown-700 hover:text-blue-800 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-brown-700 hover:text-blue-800 font-medium">
              About Us
            </Link>
            <Link
              to="/cart"
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Cart
              {itemCount > 0 && (
                <span className="bg-white text-green-700 px-2 py-0.5 rounded-full text-sm font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
