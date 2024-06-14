import { Injectable, inject } from '@angular/core';
import { Product, ProductDetails, ProductPagination } from '../types/product';
import { ENVIRONMENT } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetProductsResponse } from '../types/response';
import { ProductQuery } from '../types/product-query';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  deleteProdFromCart(id: string) {
    throw new Error('Method not implemented.');
  }
  private httpClient = inject(HttpClient);
  private env = inject(ENVIRONMENT);
  private baseUrl = `${this.env.apiUrl}/shop/products`;

  products$ = new BehaviorSubject<Product[]>([]);
  cartProducts$ = new BehaviorSubject<Product[]>([]);
  productPagination$ = new BehaviorSubject<ProductPagination>({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
     
  });

  deleteFromCart(id: string) {
    const updatedProducts = this.cartProducts$.value.filter(
      (prod) => prod._id !== id,
    );
    this.cartProducts$.next(updatedProducts);
  }

  getProductById(id: string | null) {
    return this.httpClient.get<ProductDetails>(`${this.baseUrl}/id/${id}`);
  }

  getCategoryById(id: string | null, query: ProductQuery) {
    if (id) {
      return this.httpClient.get<ApiService>(
        `${this.baseUrl}/search?&category_id=${id}`,
        {
          params: {
            ...query,
          },
        }
      );
    } else {
      return this.httpClient.get<ApiService>(`${this.baseUrl}/search`, {
        params: {
          ...query,
        },
      });
    }
  }
  
  getProducts(query: ProductQuery) {
    return this.httpClient
      .get<GetProductsResponse>(`${this.baseUrl}/search`, {
        params: {
          ...query,
        },
      })
      .subscribe((response) => {
        this.products$.next(response.products);
        this.productPagination$.next({
          pageIndex: response.page,
          pageSize: response.limit,
          total: response.total,
        });
      });
  }
}
