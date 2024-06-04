import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  user!: User;
  items: MenuItem[] | undefined;

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    })

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    this.items = [

          {
            label: 'Profile',
            routerLink: '/profile'
          },
          {
            label: 'Orders',
            routerLink: '/orders'
          },
          {
            label: 'Logout',
            command: () => {
              this.logout();
            },
            routerLink: '/login'
          },
        ]
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }


}
