import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
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

  constructor(private router: Router, private blogService: BlogService, public authService: AuthService) { }

  ngOnInit(): void {
    this.updateLoginStatus();
    this.currentUser = this.authService.getCurrentUser();
    this.displayUsername = this.currentUser ? this.currentUser.author : '';
  }

  navigateTo(): void {
    if (this.displayUsername) {
      this.router.navigate(['/profile'], { queryParams: { author: this.displayUsername } });
    }
  }


  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.loggedInUser = this.authService.getLoggedInUser();
    }
  }
 
  

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.showLoginButton = true;
    this.updateLoginStatus();
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
 
  updateNavLinkText(): void {
    this.navLinkText = 'Write Blog';
  }
}
