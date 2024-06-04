import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: []
})
export class PaymentComponent {
  order: Order = new Order();
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        console.log(order)
        this.order = order;

      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      }
    })
  }

}
