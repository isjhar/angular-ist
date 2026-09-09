import { Observable } from 'rxjs';

export interface SetupRepository {
  checkSetup(): Observable<boolean>;
  setup(params: SetupParams): Observable<void>;
}

export interface SetupParams {
  name: string;
  email: string;
  password: string;
}
