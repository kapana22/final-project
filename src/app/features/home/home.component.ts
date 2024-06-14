import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterPipe } from '../../shared/pipes/products-filter.pipe';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SortDirection } from '../../shared/types/sort-direction';
import { ProductQuery, SortProductBy } from '../../shared/types/product-query';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductPagination } from '../../shared/types/product';
import { ApiService } from '../../shared/services/api.service';

type Direction = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ProductCardComponent,
    FormsModule,
    ProductsFilterPipe,
    AsyncPipe,
    PaginatorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly cartService = inject(CartService);
  onAddToCart(id: string) {
    this.cartService.addToCart(id, 1);
  }

  searchTerm: string = '';
  categoryFilter: string = ''; // Default category
  brandFilter: string = ''; // Default to no brand filter
  sortOrder: string = 'price_asc';
  pageIndex: number = 1;
  pageSize: number = 10;

  products$: BehaviorSubject<Product[]> = this.productsService.products$;
  pagination$ = this.productsService.productPagination$;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.cartService.getCart(); // Ensure cart is fetched at initialization
    this.applyFilters();
  }

  applyFilters() {
    const sort_by = this.getSortBy();
    const sort_direction = this.getSortDirection();
    const category_id = this.categoryFilter;
    const keywords = this.searchTerm;

    const productQuery: ProductQuery = {
      page_size: this.pageSize,
      page_index: this.pageIndex,
      sort_by: sort_by,
      sort_direction: sort_direction,
      category_id: category_id,
      keywords: keywords,
      brand: this.brandFilter, // Add brand filter to query
    };

    this.productsService.getProducts(productQuery);
  }

  getSortBy(): SortProductBy {
    switch (this.sortOrder) {
      case 'price_asc':
      case 'price_desc':
        return 'price';
      case 'rating_asc':
      case 'rating_desc':
        return 'rating';
      default:
        return 'price';
    }
  }

  getCategoryId(categoryName: string): string | undefined {
    const categoryMapping: { [key: string]: string } = {
      laptops: '1',
      phones: '2',
      // Add other categories as needed
    };
    return categoryMapping[categoryName];
  }

  getSortDirection(): 'asc' | 'desc' {
    return this.sortOrder.endsWith('_asc') ? 'asc' : 'desc';
  }

  onPaginationChange(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.applyFilters();
  }

  trackByProductId(index: number, product: Product): string {
    return product._id;
  }
}
