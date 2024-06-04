// cart-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/Cart';
import { CartItem } from 'src/app/core/models/CartItem';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: []
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  

  quantityOptions: any[] | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.quantityOptions = [
      { qty: '1'},
      { qty: '2'},
      { qty: '3' },
      { qty: '4'},
    ];
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, selectedQuantity: any) {
    const quantity = parseInt(selectedQuantity);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
