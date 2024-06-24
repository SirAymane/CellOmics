import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/CartItem';
import { Product } from 'src/app/model/Product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Subscribe to the cart BehaviorSubject to get the latest cart state
    this.cartSubscription = this.cartService.getCart().subscribe(cartItems => {
      this.cart = cartItems;
      this.updateCartSummary();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.cartSubscription?.unsubscribe();
  }

  removeProduct(productId: number): void {
    this.cartService.removeFromCart(productId);
    // No need to manually refresh the cart here since it's done reactively
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    // No need to manually refresh the cart here since it's done reactively
  }

  updateCartSummary(): void {
    this.totalItems = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }

  processPurchase(): void {
    // Placeholder for future implementation
    console.log('Processing purchase...');
  }
}
