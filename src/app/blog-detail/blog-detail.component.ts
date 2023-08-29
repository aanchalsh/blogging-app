// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BlogService } from '../blog.service'; // Import BlogService
// import { Blog } from '../blog'; // Import the Blog interface

// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.css']
// })
// export class BlogDetailComponent implements OnInit {
//   blog: Blog | null = null; // Initialize as null

//   constructor(
//     private route: ActivatedRoute,
//     private blogService: BlogService // Inject BlogService
//   ) {}

//   ngOnInit(): void {
//     const blogTitle = this.route.snapshot.paramMap.get('title');
//     if (blogTitle) {
//       this.blog = this.blogService.getBlogByTitle(blogTitle);
      
//     }
    
//   }
 
  
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BlogService } from '../blog.service'; // Update the path
// import { Router } from '@angular/router'; // Import the Router
// import { Blog } from '../blog';

// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.css']
// })
// export class BlogDetailComponent implements OnInit {
//   blog: Blog | null = null;
//   filteredPosts: Blog[] = [];
//   tag: string | null = null;

//   constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {}

//   ngOnInit(): void {
//     const title = this.route.snapshot.paramMap.get('title');
    
//     if (title) {
//       this.blog = this.blogService.getBlogByTitle(title);

//       this.tag = this.route.snapshot.paramMap.get('tag');
    
//       if (this.tag) {
//         this.filteredPosts = this.blogService.getBlogsByTag(this.tag);
//       }
//     } else {
    
//     }
//   }

//   // Function to navigate to a tag route
//   filterByTag(tag: string): void {
//     this.router.navigate(['/tag', tag]);
//   }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
  
    if (title) {
      this.blog = this.blogService.getBlogByTitle(title);
      if (!this.blog) {
        console.log('Blog not found');
      }
    }
  }

  filterByTag(tag: string): void {
    this.router.navigate(['/tag', tag]);
  }
}

