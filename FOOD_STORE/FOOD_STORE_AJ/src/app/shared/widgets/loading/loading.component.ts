import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: []
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
      this.loadingService.isLoading.subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

  }
}
