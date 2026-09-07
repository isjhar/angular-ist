import { Observable } from 'rxjs';

export interface PasswordResetRepository {
  forgotPassword(data: ForgotPasswordParams): Observable<any>;
}

export interface ForgotPasswordParams {
  email: string;
}
