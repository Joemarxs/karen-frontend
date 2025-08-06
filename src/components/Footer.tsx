import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';
export function Footer() {
  return <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Karen Organics</h3>
            <p className="text-green-100 mb-4">
              Bringing farm-fresh, organic chicken products from our family to
              yours.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/254734841266"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-200"
              >
                <BsWhatsapp size={24} />
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-green-200">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-green-100 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-green-100 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#visit" className="text-green-100 hover:text-white">
                  Visit the Farm
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Farm Fresh Eggs
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Organic Broilers
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Premium Chicken Cuts
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white">
                  Specialty Items
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-green-100">
              
              <p className="mt-2">+254 725 566 168</p>
              <p>info@karenorganics.com</p>
              <p>Kenya</p>
              <p>Kiambu</p>
            </address>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>
            &copy; {new Date().getFullYear()} Karen Organics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
}