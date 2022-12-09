import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

// JSON

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLoading: boolean = false;
  error: boolean = false;
  invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authVerificator().subscribe((response: boolean) => {
      if (response) {
        this.router.navigate(['/principal/ships']);
      }
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(userName, password).subscribe({
      next: () => {
        this.router.navigate(['/principal/ships']);
      },
      error: (error) => {
        console.error('Error', error);
        this.error = true;
      },
    });
  }
}