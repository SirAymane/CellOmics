import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../model/CartItem';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromLocalStorage());

  constructor() {
    this.emitCartUpdate(); // Initial load and emit of cart state
  }

  getCart(): BehaviorSubject<CartItem[]> {
    return this.cartSubject;
  }

  addToCart(newProduct: Product): void {
    // Load the current cart from localStorage to ensure it's always up to date
    let cart = this.loadCartFromLocalStorage();
  
    // Find if the product already exists in the cart
    const existingCartItemIndex = cart.findIndex(item => item.product.id === newProduct.id);
  
    if (existingCartItemIndex !== -1) {
      // If it exists, just update the quantity
      cart[existingCartItemIndex].quantity += 1;
    } else {
      // If it doesn't exist, push a new entry
      cart.push({ product: newProduct, quantity: 1 });
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Ensure the BehaviorSubject is updated so subscribers can react
    this.cartSubject.next(cart);
  }
  
  private loadCartFromLocalStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
  
    try {
      const cart = JSON.parse(savedCart);
      // Ensure the parsed object is an array
      return Array.isArray(cart) ? cart : [];
    } catch (e) {
      // In case of JSON parsing error, return an empty array
      console.error('Error parsing cart from localStorage', e);
      return [];
    }
  }
  
  

  removeFromCart(productId: number): void {
    let cart = this.loadCartFromLocalStorage();
    cart = cart.filter(item => item.product.id !== productId);
    this.saveCartToLocalStorage(cart);
    this.emitCartUpdate();
  }

  updateQuantity(productId: number, quantity: number): void {
    let cart = this.loadCartFromLocalStorage();
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    if (itemIndex !== -1 && quantity > 0) {
      cart[itemIndex].quantity = quantity;
    } else if (quantity <= 0) {
      cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
    }
    this.saveCartToLocalStorage(cart);
    this.emitCartUpdate();
  }

  private saveCartToLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private emitCartUpdate(): void {
    this.cartSubject.next(this.loadCartFromLocalStorage());
  }
}
