import { Observable } from 'rxjs';

export interface PasswordResetRepository {
  forgotPassword(data: ForgotPasswordParams): Observable<any>;
  resetPassword(data: ResetPasswordParams): Observable<any>;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  token: string;
  email: string;
  password: string;
}
