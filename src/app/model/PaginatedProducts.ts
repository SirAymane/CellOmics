import { Product } from './Product';

export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
}
