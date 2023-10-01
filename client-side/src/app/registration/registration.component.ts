import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: any = {};
  errorMessage: string = '';
  successMessage: string="";
  

  constructor(private blogService: BlogService,private router: Router) { }

  registerUser() {
    if (this.user.password.length < 8) {
      this.errorMessage = 'Password must be atleast 8 characters long.';
      return;
    }
  
    this.blogService.registerUser(this.user).subscribe(
      (response) => {
        if (response && response.message === 'User created successfully') {
          this.successMessage = 'User created successfully';
          this.router.navigate(['login']);
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
}

