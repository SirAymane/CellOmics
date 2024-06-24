
import { Product } from './Product';
 
/**
 * CartItem model that appropriately encapsulates a Product
 *  and its quantity within the cart. This model will bridge
 *  the gap between CartService and the components using it, 
 *  allowing for a structured and type-safe approach to handling cart items.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}
