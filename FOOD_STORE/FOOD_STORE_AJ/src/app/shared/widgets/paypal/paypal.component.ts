import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/core/models/Order';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: []
})
export class PaypalComponent {
  @Input()
  order!:Order;

  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router:Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              
              this.showSuccessMessage('Success', 'Payment Saved Successfully');
            },
            error: (error) => {
              
              this.showErrorMessage('Error', 'Payment Save Failed');
            }
          }
        );
      },

      onError: (err: any) => {
        this.showErrorMessage('Error', 'Payment Failed');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

  }

  private showSuccessMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  private showErrorMessage(summary: string, detail: string): void {
    this.messageService.add({ severity: 'error', summary, detail });
  }
}
