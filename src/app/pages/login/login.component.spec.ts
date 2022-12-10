import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

const routerSpy = { navigate: jasmine.createSpy('navigate') };
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('If user already loged navigate to principal page', () => {
    spyOn(authService, 'authVerificator').and.returnValue(of(true));

    component.ngOnInit();
    fixture.detectChanges();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/principal/ships']);
  });

  it('Complete form and submit', () => {
    const { debugElement } = fixture;
    const spy = spyOn(authService, 'login').and.returnValue(of(auth));
    const loginElement = debugElement.query(By.css('.buttons__login'));

    //Complete form
    component.loginForm.setValue({
      username,
      password,
    });
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTrue();

    loginElement.nativeElement.click();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/principal/ships']);
  });

  it('Complete invalid form and submit', () => {
    const { debugElement } = fixture;
    const spy = spyOn(component, 'login').and.callThrough();
    const loginElement = debugElement.query(By.css('.buttons__login'));

    //Complete invalid form
    component.loginForm.setValue({
      username,
      password: '123',
    });
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalse();

    loginElement.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Complete form and submit but invalid user or password', () => {
    const { debugElement } = fixture;
    const spy = spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('Invalid User or Password'))
    );
    const loginElement = debugElement.query(By.css('.buttons__login'));

    //Complete form
    component.loginForm.setValue({
      username,
      password,
    });
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTrue();

    loginElement.nativeElement.click();
    expect(spy).toHaveBeenCalled();
    expect(component.error).toBeTrue();
  });
});
