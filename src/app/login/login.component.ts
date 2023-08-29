// app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isSignup: boolean = false;
  errorMessage: string = '';
  signupSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Use lowercase for variable names
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      author: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onAuthenticate(): void {
    if (this.isSignup && this.signupForm.valid) {
      const { author, username, password } = this.signupForm.value;
      this.authService.signup(author, username, password); // Call signup method
      this.signupForm.reset();
      this.signupSuccess = true;
      setTimeout(() => {
        this.signupSuccess = false;
        this.router.navigate(['/login']);
      }, 3000);
    } else if (!this.isSignup && this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isLoginSuccessful = this.authService.login(username, password);

      if (isLoginSuccessful) {
        this.router.navigate(['/write-blog']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

  toggleSignup(): void {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
