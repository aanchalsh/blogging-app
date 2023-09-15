import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: any = {};

  constructor(private blogService: BlogService) { }

  registerUser() {
    this.blogService.registerUser(this.user).subscribe(
      response => {
        // Handle successful registration here (e.g., show a success message).
        console.log('Registration successful', response);
      },
      error => {
        // Handle registration error (e.g., display an error message).
        console.error('Registration error', error);
      }
    );
  }
}

