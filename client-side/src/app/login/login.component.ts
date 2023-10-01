import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  successMessage: string="";

  constructor(
    private blogService: BlogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  
  registerUser() {
    if (this.user.password.length < 8) {
      this.errorMessage = 'Password must be atleast 8 characters long.';
      return;
    }
  
    this.blogService.registerUser(this.user).subscribe(
      (response) => {
        if (response && response.message === 'User created successfully') {
          this.successMessage = 'User created successfully';
        }
      },
      (error) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred during registration.';
        }
      }
    );
  }
  
  login() {
    this.blogService.loginUser(this.username, this.password).subscribe(
      (response) => {
        if (response && response.jwtToken) {
          const token = response.jwtToken;
          const username = response.username;
    
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
    
          this.router.navigate(['blogs/writeblog']);
        }
      },
      (error) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      }
    );
  }
  
  
  
  toggleSignup(): void {
    this.router.navigate(['register']);
  }
}
