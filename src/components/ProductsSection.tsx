import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  long_description: string;
  image: string;
}

export function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PRODUCTS_PER_PAGE = 3;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/frontend/products/`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.slice(0, 9)); // Fetch only 9
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const currentProducts = products.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : 0 // Loop back to start
    );
  };

  // 🔁 Auto-scroll every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) =>
        prev < totalPages - 1 ? prev + 1 : 0
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <section id="products" className="py-20 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
          Our Products
        </h2>
        <p className="text-lg text-brown-700 text-center max-w-xl mx-auto mb-12">
          Explore our farm's finest fresh, organic, and straight to your table.
        </p>

        <div className="relative">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 md:h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-brown-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <Link
                    to={`/learn-more/${product.id}`}
                    className="text-green-700 font-medium hover:text-green-800 hover:underline text-sm"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-100 disabled:opacity-30"
          >
            <ChevronLeft size={28} className="text-green-700" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-green-100 disabled:opacity-30"
          >
            <ChevronRight size={28} className="text-green-700" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition text-lg font-semibold shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
