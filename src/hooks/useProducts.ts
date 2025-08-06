import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFilteredProducts, PaginatedResponse } from '../api/products';
import type { Product } from '../types/product';

type Filters = {
  category?: string;
  search?: string;
  sort?: string;
};

export function useProducts(filters: Filters) {
  return useInfiniteQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 1 }: { pageParam?: unknown }) =>
      fetchFilteredProducts({ page: pageParam as number, filters }),

    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.next;
      if (!nextUrl) return undefined;

      const url = new URL(nextUrl, window.location.origin);
      const pageParam = url.searchParams.get('page');
      return pageParam ? Number(pageParam) : undefined;
    },

    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
}
