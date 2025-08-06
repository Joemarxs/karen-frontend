import { useQuery } from '@tanstack/react-query';
import { getLocations } from '../api/locations';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
    select: (data) => Array.isArray(data) ? data : [], // fallback to empty array
  });
}
