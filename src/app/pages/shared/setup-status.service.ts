import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { SETUP_REPOSITORY } from 'src/app/app-token-repository';

@Injectable({
  providedIn: 'root',
})
export class SetupStatusService {
  private setupStatus$?: Observable<boolean>;

  private setupRepository = inject(SETUP_REPOSITORY);

  check(): Observable<boolean> {
    if (!this.setupStatus$) {
      this.setupStatus$ = this.setupRepository.checkSetup().pipe(
        catchError(() => of(true)),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.setupStatus$;
  }

  markSetupCompleted(): void {
    this.setupStatus$ = of(true);
  }
}
