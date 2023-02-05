import { Injectable } from '@angular/core';
import { User } from 'src/app/domain/entities/user';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private _loggedUser?: User | undefined;
  public get loggedUser(): User | undefined {
    return this._loggedUser;
  }
  public set loggedUser(value: User | undefined) {
    this._loggedUser = value;
  }
}
