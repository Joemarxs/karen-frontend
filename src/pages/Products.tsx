import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useDebounce } from 'use-debounce';
import { FaSpinner } from 'react-icons/fa';

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500); // Debounced search input

  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'name_asc' | 'price_asc' | 'price_desc'>('name_asc');

  const { data: categories = [] } = useCategories();

  const allCategories = [
    { slug: 'all', name: 'All Products' },
    ...categories.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
    })),
  ];

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProducts({
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: debouncedSearch,
    sort: sortBy,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: '100px', threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    const current = observerRef.current;

    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);

  useEffect(() => {
    refetch(); // Trigger refetch on debounced input or filters
  }, [debouncedSearch, selectedCategory, sortBy]);

  const allProducts = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Our Products</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allCategories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'name_asc' | 'price_asc' | 'price_desc')
              }
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name_asc">Sort by Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <SlidersHorizontal className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-green-600 text-4xl" />
        </div>
      ) : isError ? (
        <p className="text-center text-red-600">Failed to load products.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {allProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found matching your criteria.
            </p>
          )}

          <div ref={observerRef} className="h-10" />

          {isFetchingNextPage && (
            <div className="flex justify-center mt-4">
              <FaSpinner className="animate-spin text-green-600 text-2xl" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
