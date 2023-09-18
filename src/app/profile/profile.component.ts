
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service'; // Update this with the correct path
import { Blog } from '../blog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  filteredBlogs: Blog[] = [];
  author: string | null = null;
  currentUser: any;
  displayusername:string = ""; // Define a property to hold the current user data
  router: any;

  constructor(private authService: AuthService,private blogService: BlogService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    // this.currentUser = this.authService.getCurrentUser();
    // this.displayusername=this.currentUser.author; // Call the AuthService function
    const author = this.route.snapshot.queryParamMap.get('author');
    console.log(author)
    if (author!==null) {
      this.blogService.searchByAuthor(author).subscribe(
        (data) => {
          console.log(data)
          this.filteredBlogs = data;
          console.log(this.filteredBlogs)
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error (e.g., display an error message to the user)
        }
      );
    }
    
    // this.blogService.getBlogsByAuthor(this.displayusername).subscribe(
    //   (blogs: Blog[]) => {
    //     this.filteredBlogs = blogs;
    //     console.log(this.filteredBlogs);
    //   },
    //   (error: any) => {
    //     console.error('Error:', error);
    //     // Handle errors here
    //   }
    // );
  }
  navigatetoEdit(blogId:string){
    this.router.navigate(['/edit', blogId]);

  }

  // getCurrentUser(): void {
  //   this.currentUser = localStorage.getItem()
  //   this.displayusername=this.currentUser.author; // Call the AuthService function
  // }
  // deleteBlog(blogId:string):void {
  //   if (blogId) {
  //     this.blogService.deleteBlog(blogId).subscribe(
  //       () => {
  //         console.log('Blog deleted successfully');
  //         this.router.navigate(['/blog-list']); // Navigate to the blog list page or another appropriate page
  //       },
  //       (error) => {
  //         console.error('Error deleting blog:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Invalid ID');
  //   }
    
  //   this.filteredBlogs = this.filteredBlogs.filter((blog: Blog) => blog.id !== blogId);
  // }
  deleteBlog(blogId: string): void {
    if (blogId) {
      // Display a confirmation dialog before deleting
      const confirmDelete = confirm('Are you sure you want to delete this blog?');

      if (confirmDelete) {
        this.blogService.deleteBlog(blogId).subscribe(
          () => {
            console.log('Blog deleted successfully');
            this.router.navigate(['/blog-list']); // Navigate to the blog list page or another appropriate page
          },
          (error) => {
            console.error('Error deleting blog:', error);
          }
        );

        // Update your local filteredBlogs array
        this.filteredBlogs = this.filteredBlogs.filter((blog: Blog) => blog.id !== blogId);
      }
    } else {
      console.error('Invalid ID');
    }
  }

  
}
