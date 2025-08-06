// src/api/categories.ts
import axios from './axios';
import type { Category } from '../types/category';

export async function fetchCategories(): Promise<Category[]> {
  const res = await axios.get<Category[]>(`${import.meta.env.VITE_API_BASE_URL}/api/categories/`);
  return res.data;
}
