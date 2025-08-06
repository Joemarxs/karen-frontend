import React, { useState } from 'react';
import { useCart } from '../hooks/useCart'; // ✅ Redux-based cart hook

export function Card() {
  const { total, deliveryFee } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const grandTotal = total + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage('');

    try {
      // ✅ Simulate or call your real payment API here
      console.log('Processing card payment:', {
        cardNumber,
        expiry,
        cvv,
        name,
        amount: grandTotal,
      });

      // Example:
      // await axios.post('/api/payments/card', { cardNumber, expiry, cvv, name, amount: grandTotal });

      setMessage('Payment successful! Your order is being processed.');
    } catch (error) {
      console.error(error);
      setMessage('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Card Payment</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-brown-700 font-medium mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter cardholder name"
              className="w-full p-2 border border-brown-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="card" className="block text-brown-700 font-medium mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="card"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter card number"
              className="w-full p-2 border border-brown-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-brown-700 font-medium mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full p-2 border border-brown-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-brown-700 font-medium mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className="w-full p-2 border border-brown-300 rounded-md"
                required
              />
            </div>
          </div>

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

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 transition"
          >
            {isProcessing ? 'Processing...' : 'Pay with Card'}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-green-700 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
