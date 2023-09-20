import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  searchQuery: string = '';
  searchResults: Blog[] = []; // Assuming your Blog model/interface is defined
  selectedSearchType: string = '';
  searchTag: string = '';
  searchTitle: string = '';
  searchAuthor: string = '';
  showInput: boolean = false;
  loggedInUser: any | null = null;
  userBlogs: any[] = [];
  showLoginButton: boolean = true;
  navLinkText: string = 'Start Writing';
  currentUser: any;
  displayUsername: string = '';
  searchTerm: string = '';

  isAuthenticated = false;

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.currentUser=localStorage.getItem('username');
    // this.updateLoginStatus();
    // this.currentUser = this.authService.getCurrentUser();
    // this.displayUsername = this.currentUser ? this.currentUser.author : '';
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Token found, set authenticated to true
      this.isAuthenticated = true;
    } else {
      // Token not found, set authenticated to false
      this.isAuthenticated = false;
    }

    this.blogService.isAuthenticatedSubject.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  navigateTo(): void {
    if (this.currentUser) {
      this.router.navigate(['/profile'], { queryParams: { author: this.currentUser } });
    }
  }


  // updateLoginStatus(): void {
  //   this.isLoggedIn = this.blogService.isAuthenticated();
  //   if (this.isLoggedIn) {
  //     //this.loggedInUser = this.blogService.getLoggedInUser();
  //   }
  // }
  navigateToWriteBlog(): void {
    if (this.isAuthenticated) {
      // User is authenticated, navigate to "Write Blog"
      this.router.navigate(['/write-blog']);
    } else {
      // User is not authenticated, navigate to the login page
      this.router.navigate(['/login']);
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token exists, otherwise false
  }
 
  

  logout(): void {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');

    // Optionally, perform additional logout actions (e.g., clear user state)

    // Redirect to the login page or any other desired page
    this.router.navigate(['/login']);
  }
 
  updateNavLinkText(): void {
    this.navLinkText = 'Write Blog';
  }
}
