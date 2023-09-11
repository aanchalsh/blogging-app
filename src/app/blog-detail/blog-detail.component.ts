
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
    this.blogService.getPostsById().subscribe((data) => {
      this.blog=data;
    });
  }

  filterByTag(tag: string): void {
    this.router.navigate(['/tag', tag]);
  }
  
  
}

