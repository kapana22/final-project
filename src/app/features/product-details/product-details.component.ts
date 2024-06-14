import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { CommonModule } from '@angular/common';
import { ProductDetails } from '../../shared/types/product';
import { CartService } from '../../shared/services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  product$ = new BehaviorSubject<ProductDetails | null>(null);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productsService.getProductById(id).subscribe((response) => {
        this.product$.next(response);
      });
    });
  }
  @Input() Product!: ProductDetails;

  addtoCart(id: string) {
    this.cartService.addToCart(id, 1);
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
