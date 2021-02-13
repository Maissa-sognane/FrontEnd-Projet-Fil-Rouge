import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private authenticationService: AuthenticationService;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/login_check`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  public isAuthenticated() {
    const user = this.authenticationService.userValue;
    const tokendecode = jwtDecode(user.token);
    const role = tokendecode['roles'][0];
    if (tokendecode){
      return true;
    }
  }

  public isConnetected() {
    const user = this.authenticationService.userValue;
    const tokendecode = jwtDecode(user.token);
    const username = tokendecode['roles'][0];
  }



  // tslint:disable-next-line:typedef
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }
}
