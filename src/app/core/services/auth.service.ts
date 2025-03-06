import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SESSION_STORAGE_KEYS, } from '../constants/local-storage-keys copy';
import { decryptDetailParam } from '../utils/token.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = decryptDetailParam(sessionStorage.getItem(SESSION_STORAGE_KEYS.Token));

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
