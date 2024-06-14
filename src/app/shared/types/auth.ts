import { Gender } from './user';

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}

export interface SignUpForm extends SignUpRequest {
  confirmPassword: string;
}

export interface AuthErrors {
  signUp: string;
  signIn: string;
}
