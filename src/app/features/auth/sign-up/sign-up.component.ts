import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Gender } from '../../../shared/types/user';
import { AuthService } from '../../../shared/services/auth.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, TitleCasePipe, AsyncPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private readonly maxNameLength = 16;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly isLoading$ = this.authService.isLoading$;
  readonly genderOptions = [Gender.Male, Gender.Female, Gender.Other];

  signupForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(this.maxNameLength),
        this.badNameValidator('bidzina'),
      ],
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(this.maxNameLength)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    avatar: ['', []],
    gender: [Gender.Other, [Validators.required]],
    age: [18, [Validators.required, Validators.min(18)]],
  });

  get controls() {
    return this.signupForm.controls;
  }

  ngOnInit(): void {
    // ერთი ვარიანტი - მხოლოდ კონტროლს ვალიდაცია...
    // this.controls.confirmPassword.setValidators(
    //   this.confirmPasswordValidator(this.controls.password),
    // );
    // this.controls.password.valueChanges.subscribe(() => {
    //   this.controls.confirmPassword.updateValueAndValidity();
    // });

    // მეორე ვარიანტი - მთელი ფორმის ჯგუფის ვალიდაცია
    this.signupForm.addValidators(this.passwordsMatchValidator());
  }

  onSubmt() {
    const signUpData = this.signupForm.getRawValue();
    this.authService.signUp(signUpData);
  }

  badNameValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      return control.value.includes(pattern)
        ? { badName: `pattern "${pattern}" is prohibited!` }
        : null;
    };
  }

  // confirmPasswordValidator(compareTo: FormControl<string | null>): ValidatorFn {
  //   return (control: AbstractControl<string>): ValidationErrors | null => {
  //     return control.value === compareTo.value
  //       ? null
  //       : { confirmPassword: 'Passwords do not match!' };
  //   };
  // }
  //

  passwordsMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.password === control.value.confirmPassword
        ? null
        : {
            passwordsMatch: 'Passwords do not match!',
          };
    };
  }
}
