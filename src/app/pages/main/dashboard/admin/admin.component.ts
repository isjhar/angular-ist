import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/app-token-repository.module';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { User } from 'src/app/domain/entities/user';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetUsersUseCase } from 'src/app/domain/use-cases/get-users-use-case';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent implements OnInit {
  totalUser$: Observable<number>;
  isXSmall$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isSmall$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Small)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isMedium$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Medium)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository,
    private breakpointObserver: BreakpointObserver
  ) {
    this.totalUser$ = new GetUsersUseCase(userRepository)
      .execute({ limit: 1 })
      .pipe(
        map<GetUseCaseResponse<User>, number>(
          (response) => response.pagination.total
        )
      );
  }

  ngOnInit(): void {}
}
