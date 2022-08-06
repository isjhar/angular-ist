import { Observable, of } from 'rxjs';
import {
  AuthRepository,
  LoginParams,
} from 'src/app/domain/repositories/auth-repository';

export class MockAuthRepository implements AuthRepository {
  getCsrfToken(): Observable<any> {
    return of();
  }
  login(data: LoginParams): Observable<any> {
    return of();
  }
  logout(): Observable<any> {
    return of();
  }
}
