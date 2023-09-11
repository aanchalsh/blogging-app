
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  filteredBlogs: Blog[] = [];
  tag: string | null = null;
  

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tag = params.get('tag');
      if (this.tag) {
        this.filteredBlogs = this.blogService.getBlogsByTag(this.tag);
      } else {
        this.blogService.getBlogs().subscribe(blogs => {
          this.filteredBlogs = blogs;
        });
      }
    });
  }
}

