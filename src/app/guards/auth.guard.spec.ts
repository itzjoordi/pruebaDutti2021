import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthGuard, { provide: Router, useValue: routerMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('User not logged', fakeAsync(() => {
    spyOn(authService, 'authVerificator').and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(guard.canLoad()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['./']);
  }));

  it('User logged', fakeAsync(() => {
    spyOn(authService, 'authVerificator').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
    expect(guard.canLoad()).toBeTrue();
  }));
});
