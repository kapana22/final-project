import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { ProductDetails } from '../../shared/types/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    
  ],  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  
  product: ProductDetails | null = null;
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getProductById(id).subscribe((response) => {
        this.product = response;
      });
    });
  }
  @Input() Product!: ProductDetails;

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
