import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkPermissions();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkPermissions();
  }

  checkPermissions(): boolean {
    const isLogged = this.authService.authVerificator();
    if (!isLogged) {
      this.router.navigate(['./']);
    }
    return isLogged;
  }
}
