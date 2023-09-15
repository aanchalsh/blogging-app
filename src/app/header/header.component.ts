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
  searchTag: string = '';
  showInput: boolean = false;
  loggedInUser: any | null = null;
  userBlogs: any[] = [];
  showLoginButton: boolean = true;
  navLinkText: string = 'Start Writing';
  currentUser: any;
  displayusername: string='';

  //filteredBlogs: Blog[] | null = null;

  constructor(private router: Router, private blogService: BlogService, public authService: AuthService) { }

  ngOnInit(): void {
    this.updateLoginStatus();
    this.currentUser = this.authService.getCurrentUser();
    this.displayusername=this.currentUser.author; 
  }
  navigateTo(){
    this.router.navigate(['/profile'],{ queryParams: { author: this.displayusername }})
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
  searchByTag(): void {
    if (this.searchTag) {
      const blogs = this.blogService.getBlogsByTag(this.searchTag);
      console.log('Blogs by Tag:', blogs);
    }
    else{
      console.log('Blogs by tag not available');
    }
  }

  


  updateNavLinkText(): void {
    this.navLinkText = 'Write Blog';
  }
}
