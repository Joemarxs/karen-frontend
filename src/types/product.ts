export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: Category;
};

export type ProductQueryParams = {
  category?: string;     // slug
  sort?: 'name_asc' | 'price_asc' | 'price_asc';
  search?: string;
  page?: number;
};
