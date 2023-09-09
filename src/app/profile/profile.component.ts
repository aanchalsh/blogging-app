
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service'; // Update this with the correct path

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  filteredBlogs: any[] = [];
  author: string | null = null;
  currentUser: any;
  displayusername:string = ""; // Define a property to hold the current user data

  constructor(private authService: AuthService,private blogService: BlogService) { }

  ngOnInit(): void {
    
    this.currentUser = this.authService.getCurrentUser();
    this.displayusername=this.currentUser.author; // Call the AuthService function
    
    this.filteredBlogs = this.blogService.getBlogsByAuthor(this.displayusername);
    console.log(this.filteredBlogs)
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.displayusername=this.currentUser.author; // Call the AuthService function
  }
  deleteblog(title:string):void {
    const shouldDelete = window.confirm('Are you sure you want to delete this blog?');
    if (shouldDelete) {
      this.blogService.deleteBlog(title);
      this.filteredBlogs = this.filteredBlogs.filter((blog: any) => blog.title !== title);
    }

  }
  
}
