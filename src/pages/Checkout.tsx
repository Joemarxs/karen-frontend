import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // Assumes Redux or custom hook

// Icons
import { FaWhatsapp, FaCreditCard } from 'react-icons/fa';

export function Checkout() {
  const { total, deliveryFee, items } = useCart(); // items: [{ name, quantity, price }]
  const grandTotal = total + deliveryFee;

  const [address, setAddress] = useState('');

  const productLines = items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - Ksh ${(item.price * item.quantity).toFixed(2)}`
    )
    .join('\n');

  const message = encodeURIComponent(
    `Hello, I'd like to complete my order:\n\n${productLines}\n\nDelivery Address: ${
      address || '[Not Provided]'
    }\n\nItems Total: Ksh ${total.toFixed(2)}\nDelivery Fee: Ksh ${deliveryFee.toFixed(
      2
    )}\nTotal to Pay: Ksh ${grandTotal.toFixed(2)}`
  );

  const whatsappURL = `https://wa.me/254734841266?text=${message}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* 🏠 Delivery Address Input */}
        <div>
          <label htmlFor="address" className="block mb-2 text-brown-700 font-medium">
            Delivery Address
          </label>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Enter your delivery location"
          />
        </div>

        {/* 💳 Payment Options */}
        <div>
          <h2 className="text-xl font-bold text-green-800 mb-4">Payment Options</h2>
          <div className="space-y-4">
            {/* M-Pesa */}
            <Link
              to="/mpesa"
              className="flex items-center justify-center gap-3 w-full bg-green-700 text-white px-4 py-3 rounded-md hover:bg-green-800 transition font-medium shadow-sm"
            >
            
              Pay with M-Pesa
            </Link>

            {/* WhatsApp */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition font-medium shadow-sm"
            >
              <FaWhatsapp className="text-white text-lg" />
              Pay with WhatsApp
            </a>

            {/* Card */}
            <Link
              to="/card"
              className="flex items-center justify-center gap-3 w-full border border-brown-300 text-brown-700 px-4 py-3 rounded-md hover:bg-brown-50 transition font-medium shadow-sm"
            >
              <FaCreditCard className="text-brown-700 text-lg" />
              Pay with Card
            </Link>
          </div>
        </div>

        {/* 🧾 Order Summary */}
        <div className="border-t border-brown-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-green-800 font-medium">Items Total:</span>
            <span className="text-green-800">Ksh {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-800 font-medium">Delivery Fee:</span>
            <span className="text-green-800">Ksh {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span className="text-green-800">Total to Pay:</span>
            <span className="text-green-800">Ksh {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
