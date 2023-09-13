import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Blogs} from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showLoginPopup: boolean = true; 
  blogs: Blogs[] = [];
  selectedTags: string[] = [];
  searchQuery: string = '';
  filteredBlogPosts: any[] = [];
  blog: Blogs | null = null;

  constructor(private authService: AuthService,private router:Router,private blogService: BlogService) {}
  
  navigateToBlogDetail(blogId: string) {
    this.router.navigate(['/blog', blogId]);
  }
  isSelectedTag(tag: string): boolean {
    return this.selectedTags.some(selectedTag => selectedTag === tag);
  }
 
  filterByTag(tag: string): void {
    this.router.navigate(['/tag', tag]);
  }
  

  getAllTags(): string[] {
    const allTags: string[] = [];
    this.blogs.forEach(post => {
      post.tags.forEach((tag: string) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  }

  ngOnInit() {
    this.blogService.getAllPosts().subscribe((data) => {
      this.blogs=data.reverse();
    });
  }

}

