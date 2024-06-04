import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/core/models/Food';
import { CartService } from 'src/app/core/services/cart.service';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: []
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        if (params.id) {
          this.foodService.getFoodById(params.id).subscribe(serverFood => {
            this.food = serverFood;
          })
        }
      })
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
