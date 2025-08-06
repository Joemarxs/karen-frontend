// api/products.ts
import axios from 'axios';
import type { Product } from '../types/product';

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type Filters = {
  category?: string;
  search?: string;
  sort?: string;
};

type Params = {
  page: number;
  filters: Filters;
};

export const fetchFilteredProducts = async ({
  page,
  filters,
}: Params): Promise<PaginatedResponse<Product>> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get<PaginatedResponse<Product>>(
    `${baseUrl}/api/products/`,
    {
      params: {
        ...filters,
        page,
      },
    }
  );

  return response.data;
};
