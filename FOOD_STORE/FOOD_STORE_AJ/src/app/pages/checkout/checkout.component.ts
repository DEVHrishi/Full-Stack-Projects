import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/core/models/Order';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: []
})
export class CheckoutComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(private cartService: CartService , private formBuilder: FormBuilder, private userService: UserService, private messageService: MessageService, private orderService: OrderService, private router: Router){}

  ngOnInit(): void {
      const cart = this.cartService
      .getCart();
      this.order.items = cart.items;
      this.order.totalPrice = cart.totalPrice;

      let {name, address} = this.userService.currentUser;
      this.checkoutForm = this.formBuilder.group({
        name: [name, Validators.required],
        address: [address, Validators.required]
      });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.showWarningMessage('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if (!this.order.addressLatLng){
      this.showWarningMessage('Please select your location on the map', 'Location');
      return;
    }
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.showWarningMessage(errorResponse.error , 'Cart');
      }
    })
  }

  private showWarningMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: 'warn', summary, detail });
  }

}
