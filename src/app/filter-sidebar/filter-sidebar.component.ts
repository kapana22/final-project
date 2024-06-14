import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {

  constructor(public http: ApiService) {}
  ngOnInit(): void {}

  public categories: any = "";
  public brands: any = "";
  public minPrice: any;
  public maxPrice: any;
  public rating: any;

  categoryInfo() {
    if (this.categories.toLowerCase() === "laptops") {
      this.categories = 1;
    } else if (this.categories.toLowerCase() === "phones") {
      this.categories = 2;
    }
    this.http.categoryInfo.next(this.categories);
    this.categories = '';
  }

  brandInfo() {
    this.http.brandInfo.next(this.brands);
    this.brands = '';
  }

  minMaxPrice() {
    this.http.minInfo.next(this.minPrice);
    this.http.maxInfo.next(this.maxPrice);
    this.minPrice = '';
    this.maxPrice = '';
  }

  ratingInfo() {
    this.http.ratingInfo.next(this.rating);
    this.rating = '';
  }
}