import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  authVerificator(): boolean {
    if (!localStorage.getItem('currentUser')) {
      return false;
    }
    return true;
  }

  login(username: string, password: string): Observable<Auth> {
    return this.http
      .post<Auth>(`${this.baseURL}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          this.auth = user;
          return user;
        })
      );
  }

  register(user: Auth) {
    return this.http.post(`${this.baseURL}/users/register`, user);
  }

  logout() {
    return this.http.post(`${this.baseURL}/users/logout`, {});
  }
}
