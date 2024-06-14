import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../../environments/environment';
import { AuthErrors, SignUpRequest } from '../types/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { SignInResponse } from '../types/response';
import { ApiError } from '../types/api-error';
import { User } from '../types/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  validateLogin() {
    throw new Error('Method not implemented.');
  }
  private readonly env = inject(ENVIRONMENT);
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${this.env.apiUrl}/auth`;
  isLoading$ = new BehaviorSubject<boolean>(false);
  errors$ = new BehaviorSubject<AuthErrors>({
    signUp: '',
    signIn: '',
  });
  user$ = new BehaviorSubject<User | null>(null);

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  get isTokenValid() {
    const token = this.accessToken;
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  set accessToken(value: string) {
    localStorage.setItem('access_token', value);
  }

  set refreshToken(value: string) {
    localStorage.setItem('refresh_token', value);
  }

  init() {
    const token = this.accessToken;
    if (token) {
      const user = this.parseJwt(token);
      this.user$.next(user);
    }
  }

  signUp(data: SignUpRequest) {
    this.isLoading$.next(true);

    this.httpClient
      .post(`${this.baseUrl}/sign_up`, data)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error = errorResponse.error as ApiError;
          this.errors$.next({ ...this.errors$.value, signUp: error.error });
          this.isLoading$.next(false);
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.isLoading$.next(false);
        this.router.navigate(['/auth', 'sign-in'], {
          queryParams: { signUpSuccess: true },
        });
      });
  }

  signIn(email: string, password: string) {
    this.isLoading$.next(true);
    this.httpClient
      .post<SignInResponse>(`${this.baseUrl}/sign_in`, { email, password })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const error = errorResponse.error as ApiError;
          this.errors$.next({ ...this.errors$.value, signIn: error.error });
          this.isLoading$.next(false);
          return EMPTY;
        }),
      )
      .subscribe(({ access_token, refresh_token }) => {
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
        console.log(access_token, refresh_token);
        const user = this.parseJwt(access_token);
        console.log(user);
        this.user$.next(user);
        this.isLoading$.next(false);
        this.router.navigate(['/']);
      });
  }

  signOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.user$.next(null);
    this.router.navigate(['/']);
  }

  parseJwt(token: string): User | null {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string) {
    const userObject = this.parseJwt(token);
    if (!userObject) return true;

    return userObject.exp > Date.now();
  }

  canActivate(): boolean | UrlTree {
    if (this.isTokenValid) {
      return true;
    } else {
      return this.router.parseUrl('/auth/sign-in');
    }
  }
}
