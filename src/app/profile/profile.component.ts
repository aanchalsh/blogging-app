
import { Component, OnInit } from '@angular/core';
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
  displayusername:string = ""; 
  router: any;
  

  constructor(private blogService: BlogService,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    const author = this.route.snapshot.queryParamMap.get('author');
    //console.log(author)
    if (author!==null) {
      this.author=author;
      this.blogService.searchByAuthor(author).subscribe(
        (data) => {
          console.log(data)
          this.filteredBlogs = data;
          console.log(this.filteredBlogs)
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    
  }
  navigatetoEdit(blogId:string){
    this.router.navigate(['/edit', blogId]);

  }

  deleteBlog(blogId: string): void {
    if (blogId) {
      const confirmDelete = confirm('Are you sure you want to delete this blog?');

      if (confirmDelete) {
        this.blogService.deleteBlog(blogId).subscribe(
          () => {
            console.log('Blog deleted successfully');
            this.router.navigate(['/blog-list']); 
          },
          (error) => {
            console.error('Error deleting blog:', error);
          }
        );

        this.filteredBlogs = this.filteredBlogs.filter((blog: Blog) => blog.id !== blogId);
      }
    } else {
      console.error('Invalid ID');
    }
  }
  

  
}
