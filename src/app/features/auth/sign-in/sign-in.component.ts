import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink, AsyncPipe],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  errorMessage$ = this.authService.errors$.pipe(map((error) => error.signIn));
  isLoading$ = this.authService.isLoading$;
  isSignUpSuccess$ = this.activatedRoute.queryParamMap.pipe(
    map((queryParamMap) => Boolean(queryParamMap.get('signUpSuccess'))),
  );
  email = '';
  password = '';
  keepSignedIn = false;
  onSignIn() {
    console.log('clicked');
    this.authService.signIn(this.email, this.password);
  }
}
