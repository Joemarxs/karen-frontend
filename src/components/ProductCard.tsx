import React, { useState } from 'react';
import { useCart } from '../hooks/useCart'; // ✅ Redux hook
import { ShoppingCart, CheckCircle } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: {
    id: number;
    name: string;
  };
};

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart(); // ✅ Redux action

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      unit: product.unit
    });

    setQuantity(1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 700);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          {product.name}
        </h3>
        <p className="text-brown-600 mb-1">{product.description}</p>
        <p className="text-sm text-gray-500 mb-2">Category: {product.category.name}</p>
        <p className="text-brown-800 font-bold mb-3">
          KES {Number(product.price).toFixed(2)} / {product.unit}
        </p>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value || '1')))
            }
            className="w-20 px-2 py-1 border border-brown-300 rounded-md"
          />
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              isAdded
                ? 'bg-green-100 text-green-800 border border-green-500'
                : 'bg-green-700 text-white hover:bg-green-800'
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle size={18} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
