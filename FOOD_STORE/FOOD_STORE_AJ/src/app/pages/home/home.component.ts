import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/core/models/Food';
import { FoodService } from 'src/app/core/services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []

})
export class HomeComponent implements OnInit {
  foods:Food[] = [];
  constructor(private foodService: FoodService, private activateRoute: ActivatedRoute, private router: Router) {
    
  }
  

  ngOnInit(): void {
    let foodsObservable: Observable<Food[]>;
    this.activateRoute.params.subscribe((params) => {
      if(params.searchTerm) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if(params.Tag) {
        foodsObservable = this.foodService.getAllFoodByTag(params.Tag);
      }
      
      else {
        foodsObservable = this.foodService.getAll();
      }
      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
  }

  foodDetails(id: string) {
    this.router.navigateByUrl('/food/'+ id)
  }

  
}
