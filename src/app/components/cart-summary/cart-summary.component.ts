import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../model/CartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart;
      this.totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      this.totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
