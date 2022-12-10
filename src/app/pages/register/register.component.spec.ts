import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from './register.component';

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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Complete form and submit', () => {
    const { debugElement } = fixture;
    const spy = spyOn(authService, 'register').and.returnValue(of(auth));
    const registerElement = debugElement.query(By.css('.buttons__register'));

    //Complete form
    component.registerForm.setValue({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeTrue();

    registerElement.nativeElement.click();
    expect(spy).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Complete invalid form and submit', () => {
    const { debugElement } = fixture;
    const spy = spyOn(component, 'registerUser').and.callThrough();
    const registerElement = debugElement.query(By.css('.buttons__register'));

    //Complete invalid form
    component.registerForm.setValue({
      firstName,
      lastName,
      username,
      email,
      password: '123',
    });
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeFalse();

    registerElement.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Complete form and submit but invalid user or password', () => {
    const { debugElement } = fixture;
    const spy = spyOn(authService, 'register').and.returnValue(
      throwError(() => new Error('Invalid User or Password'))
    );
    const consoleSpy = spyOn(console, 'error').and.callThrough();
    const registerElement = debugElement.query(By.css('.buttons__register'));

    //Complete form
    component.registerForm.setValue({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeTrue();

    registerElement.nativeElement.click();
    expect(spy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
