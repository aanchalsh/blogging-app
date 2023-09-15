
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
  tag!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.route.params.subscribe((params) => {
    this.tag = params['tag'];
    
  }); }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      console.log(postId)
      if (postId) {
        this.blogService.getPostsById(postId).subscribe(
          (data) => {
            this.blog = data;
          },
          (error) => {
            console.error('Error fetching blog post:', error);
          }
        );
      }
    });
  }

  filterByTag(tag: string): void {
    this.router.navigate(['/searchByTag'],{ queryParams: { tag: tag }});
  }
  
  
}


