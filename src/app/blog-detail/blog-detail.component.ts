
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blogs } from '../blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blogs | null = null;
  tag!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.route.params.subscribe((params) => {
    this.tag = params['tag'];
    this.searchBlogsByTag(this.tag);
  }); }

  ngOnInit(): void {
    this.blogService.getPostsById().subscribe((data) => {
      this.blog=data;
    });
  }

  filterByTag(tag: string): void {
    this.router.navigate(['/tag', tag]);
  }
  searchBlogsByTag(tag: string): void {
    this.blogService.getBlogsByTag(tag).subscribe((blogs) => {
    
    });
  
}
}