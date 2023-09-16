import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { User } from '../user';

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
  user: any = {};

  username: string="";
  password: string="";

  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private blogService: BlogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  registerUser() {
    this.blogService.registerUser(this.user).subscribe(

      response => {
        
        console.log('Registration successful', response);
        
      },
      error => {
        
        console.error('Registration error', error);
      }
    );
  }
  login() {
    this.blogService.loginUser(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['blogs/writeblog']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
  // onAuthenticate(): void {
  //   if (this.isSignup && this.signupForm.valid) {
  //     const { username, password, author } = this.signupForm.value;
  //     const isSignupSuccessful = this.authService.signup(username, password, author);

  //     if (isSignupSuccessful) {
  //       this.signupForm.reset();
  //       this.signupSuccess = true;
  //       setTimeout(() => {
  //         this.signupSuccess = false;
  //         this.authService.setLoggedInStatus(true); // Set the logged in status
  //        // this.router.navigate(['/home']);
  //       }, 3000);
  //     } else {
  //       this.errorMessage = 'Username already exists'; // Display the error message
  //     }
  //   } else if (!this.isSignup && this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     const isLoginSuccessful = this.authService.login(username, password);

  //     if (isLoginSuccessful) {
  //       this.authService.setLoggedInStatus(true); // Set the logged in status
  //       this.router.navigate(['/write-blog']);
  //     } else {
  //       this.errorMessage = 'Invalid username or password';
  //     }
  //   } else {
  //     this.errorMessage = 'Please fill in all required fields'; // Display the general error message
  //   }
  // }
  toggleSignup(): void {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
