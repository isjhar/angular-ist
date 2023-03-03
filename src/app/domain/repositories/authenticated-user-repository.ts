import { Observable } from 'rxjs';
import { AccessControlId } from '../entities/access-control';
import { User } from '../entities/user';

export interface AuthenticatedUserRepository {
  getAuthenticatedUser(): Observable<User>;
  isAuthenticated(): Observable<boolean>;
  store(user: User): Observable<void>;
  delete(): Observable<void>;
  hasAccessControl(accessControlId: AccessControlId): Observable<boolean>;
}
