
import { Component, OnInit ,ViewChild ,ChangeDetectorRef} from '@angular/core';
import { BlogService } from '../blog.service'; // Update this with the correct path
import { Blog } from '../blog';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../userprofile';

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
  userProfile: UserProfile|any;
  

  constructor(private blogService: BlogService,private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
   }
   @ViewChild('noBlogsFound')
   noBlogsFound!: any;
   
  ngOnInit(): void {
    const author = this.route.snapshot.queryParamMap.get('author');
    if (author!==null) {
      this.author=author;
      this.blogService.getUserProfile(author).subscribe(
        (data) => {
          this.userProfile = data;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching user profile:', error);
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



