import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/models/Order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: []
})
export class OrderTrackComponent {
  order!: Order;
  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (!params.orderId) return;

    this.orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
  }
}
