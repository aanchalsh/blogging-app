

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchTag: string = ''; 
  showInput: boolean = false;

  loggedInUser: any | null = null;
  userBlogs: any[] = [];
  constructor(private router: Router, private blogService: BlogService , public authService: AuthService) {}

 
  

 

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.loggedInUser = this.authService.getLoggedInUser();
      this.userBlogs = this.blogService.getUserBlogs(this.loggedInUser.username);
    }
  }

 
 
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  
  searchByTag(): void {
    if (this.searchTag) {
      const blogs = this.blogService.getBlogsByTag(this.searchTag);
      console.log('Blogs by Tag:', blogs);
    }
    else{
      console.log('Blogs by tag not available');
    }
  }
}


