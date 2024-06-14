import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { canActivateAuthenticated } from './shared/guards/can-activate-authenticated.guard';
import { canActivateUnauthenticated } from './shared/guards/can-activate-unauthenticated.guard';
import { AboutComponent } from './about/about.component';
import { ServicesShopComponent } from './services-shop/services-shop.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'cart',
    canActivate: [canActivateAuthenticated],
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'auth',
    canActivate: [canActivateUnauthenticated],
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  
  { 
    path: 'home',
    loadChildren: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesShopComponent },
  { path: 'footer', component: FooterComponent },

];
