import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SignInComponent,
    SignUpComponent,
    RouterOutlet,
    HeaderComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    AboutComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  user$ = this.authService.user$;

  ngOnInit(): void {
    this.cartService.getCart();
  }
}
