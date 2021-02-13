import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import {JwtInterceptor} from '../_helpers/jwt.interceptor';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {isObject} from 'rxjs/internal-compatibility';
import {isString} from 'highcharts';

@Injectable({ providedIn: 'root' })
export class UserService {
  users: any;
  constructor(private http: HttpClient) { }

  // @ts-ignore
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'multipart/form-data'})
  };

  // tslint:disable-next-line:typedef
  getUserAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/admin/users`, this.httpOptions);
  }

  updateUser(id, user): Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiUrl}/api/admin/user/${id}`, user, this.httpOptions);
  }
  // tslint:disable-next-line:typedef
  createUser(data): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/api/admin/users`, data);
  }
  // tslint:disable-next-line:typedef
  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  // @ts-ignore
  findUser(username): Subscription {
    this.getUserAll().pipe(first()).subscribe(
      users => {
        this.users = users;
      //  this.users['hydra:member'];
      });

  }

  // tslint:disable-next-line:typedef
  getToken() {
    return localStorage.getItem('user');
  }

  searchByName(email): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}?email=${email}`);
  }

  findUsers(
    userId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<User[]> {

    return this.http.get(`${environment.apiUrl}/api/admin/users`, {
      params: new HttpParams()
        .set('courseId', userId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res =>  res["payload"])
    );
  }
}
