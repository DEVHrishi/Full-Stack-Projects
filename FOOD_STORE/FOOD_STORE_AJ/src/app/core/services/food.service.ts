import { Injectable } from '@angular/core';
import { Food } from '../models/Food';
import { Tags } from '../models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http: HttpClient){}

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+ searchTerm);
  }

  getFoodById(foodId: string):Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

  getAllTags():Observable<Tags[]> {
    return this.http.get<Tags[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(Tag:string):Observable<Food[]> {
    return Tag == 'All' ? 
    this.getAll() : 
    this.http.get<Food[]>(FOODS_BY_TAG_URL + Tag);
  }

}
