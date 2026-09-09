import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/data/entities/api-response';
import {
  SetupParams,
  SetupRepository,
} from 'src/app/domain/repositories/setup-repository';

@Injectable()
export class ApiSetupRepository implements SetupRepository {
  constructor(private http: HttpClient) {}
  checkSetup(): Observable<boolean> {
    let headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http
      .get<ApiResponse<boolean>>('/api/setup-status', {
        headers: headers,
      })
      .pipe(map((response) => response.data));
  }
  setup(params: SetupParams): Observable<void> {
    let headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http.get<ApiResponse<void>>('/sanctum/csrf-cookie').pipe(
      concatMap(() =>
        this.http
          .post<ApiResponse<void>>('/api/setup', params, {
            headers: headers,
            withCredentials: true,
            responseType: 'json',
          })
          .pipe(map((response) => response.data)),
      ),
    );
  }
}
