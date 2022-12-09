import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Auth } from '../interfaces/auth.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    if (!url.includes('/users')) {
      return next.handle(request);
    }

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe(delay(400)) // simulate backend time response
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users/logout') && method === 'POST':
          return logout();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserDetail();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const { username, password } = body;
      const users: Auth[] = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) {
        return error('Usuario o contraseña incorrecto');
      }
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }

    function register() {
      const user = body;
      const localUsers: Auth[] =
        JSON.parse(localStorage.getItem('users')) || [];

      if (localUsers.find((x) => x.username === user.username)) {
        return error('El usuario "' + user.username + '" ya existe.');
      }

      user.id = localUsers.length
        ? Math.max(...localUsers.map((x) => x.id)) + 1
        : 1;
      localUsers.push(user);
      localStorage.setItem('users', JSON.stringify(localUsers));

      return ok();
    }

    function getUserDetail() {
      const id = idFromUrl();
      const localUsers: Auth[] =
        JSON.parse(localStorage.getItem('users')) || [];
      return ok(localUsers.find((user) => user.id === id));
    }

    function logout() {
      localStorage.removeItem('currentUser');
      return ok();
    }

    // helper functions
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1], 0);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
