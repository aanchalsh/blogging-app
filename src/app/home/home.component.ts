import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showLoginPopup: boolean = true; 
  blogs: Blog[] = [];
  selectedTags: string[] = [];
  searchQuery: string = '';
  filteredBlogPosts: any[] = [];
  blog: Blog | undefined;

  constructor(private authService: AuthService,private router:Router,private blogService: BlogService,) {}
  
  navigateToBlogDetail(blogId: string) {
    this.router.navigate(['/posts', blogId]);
  
    console.log(blogId);
  }
  searchByTag(tag: string) {
    this.router.navigate(['/searchByTag'], { queryParams: { tag: tag } });
  }
  isSelectedTag(tag: string): boolean {
    return this.selectedTags.some(selectedTag => selectedTag === tag);
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
      console.log(this.blogs)
    });
  }

}

