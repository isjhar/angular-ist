import { Observable, of } from 'rxjs';
import {
  ForgotPasswordParams,
  PasswordResetRepository,
  ResetPasswordParams,
} from 'src/app/domain/repositories/password-reset-repository';
import { MockUserRepository } from './mock-user-repository';

export class MockPasswordResetRepository implements PasswordResetRepository {
  forgotPassword(data: ForgotPasswordParams): Observable<any> {
    return new Observable<any>((observer) => {
      let user = MockUserRepository.users.find(
        (element) => element.email === data.email,
      );
      if (!user) {
        observer.error('user not found');
        observer.complete();
        return;
      }
      observer.next({ message: 'Password reset email sent.' });
      observer.complete();
    });
  }

  resetPassword(data: ResetPasswordParams): Observable<any> {
    return of({ message: 'Password has been reset.' });
  }
}
