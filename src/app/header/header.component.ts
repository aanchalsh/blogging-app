import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { Blogs } from '../blog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchResults: Blogs[] = [];
  searchTag: string = '';
  searchTitle:string='';
  searchAuthor:string='';
  searchQuery:string='';
  showInput: boolean = false;
  loggedInUser: any | null = null;
  userBlogs: any[] = [];
  showLoginButton: boolean = true;
  navLinkText: string = 'Start Writing';
  selectedSearchType: string = ''; // Default to 'tag', but you can change it as needed


  //filteredBlogs: Blog[] | null = null;

  constructor(private router: Router, private blogService: BlogService, public authService: AuthService) { }

  ngOnInit(): void {
    this.updateLoginStatus();
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
  // searchByTag(): void {
  //   if (this.searchTag) {
  //     const blogs = this.blogService.getBlogsByTag(this.searchTag);
  //     console.log('Blogs by Tag:', blogs);
  //   }
  //   else{
  //     console.log('Blogs by tag not available');
  //   }
  // }
  // searchBlogs(): void {
  //   if (this.searchQuery) {
  //     // Remove any leading "#" character and trim the searchQuery
  //     const sanitizedQuery = this.searchQuery.replace(/^#/, '').trim();
  
  //     if (sanitizedQuery) {
  //       if (sanitizedQuery.startsWith('tag:')) {
  //         // Extract the tag and navigate to the tag search route
  //         const tag = sanitizedQuery.substring(4).trim();
  //         this.router.navigate(['/blogs/tag', tag]);
  //       } else {
  //         // Navigate to the title search route
  //         this.router.navigate(['/blogs/title', sanitizedQuery]);
  //       }
  //     } else {
  //       // Handle the case when the sanitized query is empty
  //       // (e.g., show an error message or do nothing).
  //     }
  //   } else {
  //     // Handle the case when the searchQuery is empty
  //     // (e.g., show an error message or do nothing).
  //   }
  // }
  
  
  
  

  updateNavLinkText(): void {
    this.navLinkText = 'Write Blog';
  }
}