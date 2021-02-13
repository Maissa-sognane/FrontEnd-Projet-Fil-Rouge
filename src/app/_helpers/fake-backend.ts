import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../_models/user';
import { Role } from '../_models/role';
/*

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      // tslint:disable-next-line:max-line-length
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    // tslint:disable-next-line:typedef
    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }

    }

    // route functions

    // tslint:disable-next-line:typedef
    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
      });
    }

    // tslint:disable-next-line:typedef
    function getUsers() {
      if (!isAdmin()) { return unauthorized(); }
      return ok(users);
    }

    // tslint:disable-next-line:typedef
    function getUserById() {
      if (!isLoggedIn()) { return unauthorized(); }

      // only admins can access other user records
      if (!isAdmin() && currentUser().id !== idFromUrl()) { return unauthorized(); }

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    // tslint:disable-next-line:typedef no-shadowed-variable
    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    // tslint:disable-next-line:typedef
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } });
    }

    // tslint:disable-next-line:typedef
    function error(message) {
      return throwError({ status: 400, error: { message } });
    }

    // tslint:disable-next-line:typedef
    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    // tslint:disable-next-line:typedef
    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    // tslint:disable-next-line:typedef
    function currentUser() {
      if (!isLoggedIn()) { return; }
      // tslint:disable-next-line:radix
      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return users.find(x => x.id === id);
    }

    // tslint:disable-next-line:typedef
    function idFromUrl() {
      const urlParts = url.split('/');
      // tslint:disable-next-line:radix
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
*/
