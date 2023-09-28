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
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.isAuthenticated = true;
    } else {
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


  
  navigateToWriteBlog(): void {
    if (this.isAuthenticated) {
    
      this.router.navigate(['/write-blog']);
    } else {
   
      this.router.navigate(['/login']);
    }
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }
 
  

  logout(): void {
   
    localStorage.removeItem('token');

    this.router.navigate(['/blogs/posts']);
  }
 
  updateNavLinkText(): void {
    this.navLinkText = 'Write Blog';
  }
}
