import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { CurrencyPipe } from '@angular/common';
import { ProductDetails } from '../../shared/types/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  product: ProductDetails | null = null;

  ngOnInit(): void {
    // TODO: take value of one stream and use it to create another stream
  }
}
