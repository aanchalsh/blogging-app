
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blogs } from '../blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  filteredBlogs: Blogs[] = [];
  tag: string| null=null;
  

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    // Get the tag from the route parameter
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
      // Call the method to fetch blogs by tag
      if (this.tag !== null) {
      this.searchBlogsByTag(this.tag);
      }
    });
  }

  searchBlogsByTag(tag: string): void {
    this.blogService.getBlogsByTag(tag).subscribe((blogs) => {
      this.filteredBlogs = blogs;
      // Handle the retrieved blogs, e.g., display them in your component
    });
  }
}


