
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
  ) { }

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

