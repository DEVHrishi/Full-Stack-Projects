import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tags } from 'src/app/core/models/Tag';
import { FoodService } from 'src/app/core/services/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: []
})
export class TagsComponent implements OnInit {
  tags?:Tags[];
  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit(): void {
      this.foodService.getAllTags().subscribe(serverTags => {
        this.tags = serverTags;
      })
  }

  onClickTag(Tag: string): void{
    this.router.navigateByUrl('/tag/'+ Tag)
  }
}
