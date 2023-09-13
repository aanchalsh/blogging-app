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
  user:any;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
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
      const { username, password, author } = this.signupForm.value;
      const isSignupSuccessful = this.authService.signup(username, password, author);

      if (isSignupSuccessful) {
        this.signupForm.reset();
        this.signupSuccess = true;
        setTimeout(() => {
          this.signupSuccess = false;
          this.authService.setLoggedInStatus(true); // Set the logged in status
          this.router.navigate(['/home']);
        }, 3000);
      } else {
        this.errorMessage = 'Username already exists'; // Display the error message
      }
    } else if (!this.isSignup && this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const isLoginSuccessful = this.authService.login(username, password);

      if (isLoginSuccessful) {
        this.authService.setLoggedInStatus(true); // Set the logged in status
        this.router.navigate(['/blogs/posts']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    } else {
      this.errorMessage = 'Please fill in all required fields'; // Display the general error message
    }
  }
  toggleSignup(): void {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
