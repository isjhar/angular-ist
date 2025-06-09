import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/app-token-repository';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { User } from 'src/app/domain/entities/user';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetUsersUseCase } from 'src/app/domain/use-cases/get-users-use-case';
import { SkeletonComponent } from 'src/app/pages/shared/skeleton/skeleton.component';

import { DefaultNumberPipe } from '../../../shared/text/default-number.pipe';

@Component({
  selector: 'app-admin',
  imports: [MatCardModule, DefaultNumberPipe, AsyncPipe, SkeletonComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
})
export class AdminComponent implements OnInit {
  totalUser$: Observable<number>;

  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository
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
