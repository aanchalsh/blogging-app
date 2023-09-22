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

  constructor(
    private blogService: BlogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  // registerUser() {
  //   this.blogService.registerUser(this.user).subscribe(

  //     response => {
        
  //       console.log('Registration successful', response);

  //     },
  //     error => {
        
  //       console.error('Registration error', error);
  //     }
  //   );
  // }
  registerUser() {
    this.blogService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.signupSuccess = true;
        this.errorMessage = ''; 
      },
      (error) => {
        console.error('Registration error', error);
        this.errorMessage = error.error;
      }
    );
  }
  
  // registerUser() {
  //   // Check if the password length is exactly 8 characters
  //   if (this.user.password.length !== 8) {
  //     this.errorMessage = 'Password must be exactly 8 characters long.';
  //     return;
  //   }
  
    
  //   this.blogService.registerUser(this.user).subscribe(
  //     (response) => {
  //       console.log('Registration successful', response);
  //       this.signupSuccess = true;
  //       this.errorMessage = ''; 
  //       this.errorMessage = "Registration successful";
  //     }
  //     ,
  //   (error) => {
  //     console.error('Registration error', error);
  //     this.errorMessage ="User already exists";
  //   }
  // );
  // }

  login() {
    this.blogService.loginUser(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
  
        const token = response.jwtToken;
        const username = response.username;

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
  
        this.router.navigate(['blogs/writeblog']);
        
      }
      ,
    (error) => {
      console.error('Login error', error);
      this.errorMessage = "Invalid Credentials"; // Display the error message in your component
    }
  );
  }
  
  
  toggleSignup(): void {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
