import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useLocations } from '../hooks/useLocations';
import { DeliveryLocation } from '../api/locations';

export function CartPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  const {
    items,
    removeItem,
    updateQuantity,
    total,
    clearCart,
    setDeliveryFee,
    deliveryFee,
  } = useCart();

  const { data: locations = [], isLoading } = useLocations();

  const selectedLocation: DeliveryLocation | undefined = locations.find(
    (loc) => loc.id === selectedLocationId
  );

  useEffect(() => {
    if (selectedLocation) {
      const fee = parseFloat(selectedLocation.delivery_price || '0');
      setDeliveryFee(fee);
    } else {
      setDeliveryFee(0);
    }
  }, [selectedLocation, setDeliveryFee]);

  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag size={48} className="mx-auto text-green-300 mb-4" />
          <h1 className="text-3xl font-bold text-green-800 mb-4">Your Cart is Empty</h1>
          <p className="text-brown-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start border-b border-brown-200 pb-6"
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-brown-800">
                      {item.name}
                    </h3>
                    <p className="text-brown-600">
                      Ksh {Number(item.price).toFixed(2)} / {item.unit}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(1, parseInt(e.target.value)))
                        }
                        className="w-20 px-2 py-1 border border-brown-300 rounded-md"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-800">
                      Ksh {(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-green-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-brown-600">
                <select
                  value={selectedLocationId ?? ''}
                  onChange={(e) => setSelectedLocationId(Number(e.target.value))}
                  className="px-4 py-2 border border-brown-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Delivery Location</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <span className="text-green-800">Ksh {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="border-t border-brown-200 pt-4 space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-green-800">Items Total</span>
                  <span className="text-green-800">Ksh {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-green-800">Delivery Fee</span>
                  <span className="text-green-800">Ksh {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-brown-200 pt-2">
                  <span className="text-green-800">Grand Total</span>
                  <span className="text-green-800">Ksh {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout-with-mpesa-or-card"
                className="block w-full bg-green-700 text-white px-4 py-3 rounded-md hover:bg-green-800 transition text-center"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={clearCart}
                className="w-full border border-brown-300 text-brown-600 px-4 py-3 rounded-md hover:bg-brown-50 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
