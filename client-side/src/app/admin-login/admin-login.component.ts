import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
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
  
  login() {
    this.blogService.loginUser(this.username, this.password).subscribe(
      (response) => {
        if (response && response.jwtToken) {
          const token = response.jwtToken;
          const username = response.username;
    
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
    
          this.router.navigate(['admin-function']);
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
