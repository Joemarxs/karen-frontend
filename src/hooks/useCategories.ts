import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';
import type { Category } from '../types/category';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
