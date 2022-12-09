import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = environment.authAPI;
  private auth: Auth | undefined;

  get getAuth(): Auth {
    return { ...this.auth! };
  }

  constructor(private http: HttpClient) {}

  authVerificator(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false);
    }

    return this.http
      .get<Auth>(`${this.baseURL}/users/${localStorage.getItem('id')}`)
      .pipe(
        map((auth) => {
          this.auth = auth;
          return true;
        })
      );
  }

  login(userName: string, password: string): Observable<Auth> {
    return this.http.get<Auth[]>(`${this.baseURL}/users/`).pipe(
      map((userList) => {
        const filterUserList = userList.filter(
          (user: Auth) => user.user === userName && user.password === password
        );
        if (filterUserList.length > 0) {
          this.auth = filterUserList[0];
          localStorage.setItem('id', this.auth.id);
          return this.auth;
        }
        throw new Error('ERR_401');
      })
    );
  }

  logout() {
    this.auth = undefined;
    localStorage.removeItem('id');
  }
}
