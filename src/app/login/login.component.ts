import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';


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
    private AuthService: AuthService,
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
      this.onSignup(author, username, password);
    } else if (!this.isSignup && this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isLoginSuccessful = this.AuthService.login(username, password);

      if (isLoginSuccessful) {
        this.router.navigate(['/write-blog']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

  onSignup(author: string, username: string, password: string): void {
    if (this.AuthService.isUsernameAvailable(username)) {
      localStorage.setItem('signupUsername', username);
      localStorage.setItem('signupPassword', password);
      localStorage.setItem('signupAuthorName', author);
      this.signupForm.reset();
      this.signupSuccess = true;
      setTimeout(() => {
        this.signupSuccess = false;
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.errorMessage = 'Username is already taken. Please choose a different username.';
    }
  }

  toggleSignup(): void {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}