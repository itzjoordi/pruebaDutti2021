import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

import { AuthService } from './auth.service';

const endpoint = environment.authAPI;
const username = 'UserName';
const password = 'password';
const email = 'test@test.com';
const firstName = 'User';
const lastName = 'Name';
const auth: Auth = {
  id: 1,
  username,
  password,
  email,
  firstName,
  lastName,
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Login', () => {
    service.login(username, password).subscribe((response: Auth) => {
      expect(response).toEqual(auth);
    });

    const request = httpMock.expectOne(`${endpoint}/users/authenticate`);
    expect(request.request.method).toBe('POST');
    request.flush(auth);
  });

  it('Logout', () => {
    service.logout().subscribe((response) => {
      expect(response).toEqual({});
    });

    const request = httpMock.expectOne(`${endpoint}/users/logout`);
    expect(request.request.method).toBe('POST');
    request.flush({});
  });

  it('Register', () => {
    service.register(auth).subscribe((response) => {
      expect(response).toEqual({});
    });

    const request = httpMock.expectOne(`${endpoint}/users/register`);
    expect(request.request.method).toBe('POST');
    request.flush({});
  });

  it('AuthVerificator with local storage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      const storage = { currentUser: '1' };
      return storage[key as keyof typeof storage]
        ? storage[key as keyof typeof storage]
        : null;
    });

    service.authVerificator().subscribe((response) => {
      expect(response).toEqual(true);
    });

    const request = httpMock.expectOne(`${endpoint}/users/1`);
    expect(request.request.method).toBe('GET');
    request.flush(true);
  });

  it('AuthVerificator without local storage', () => {
    localStorage.removeItem('currentUser');

    service.authVerificator().subscribe((response) => {
      expect(response).toEqual(false);
    });
  });
});
