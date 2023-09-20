import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  filteredBlogs: Blog[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['searchTerm'];
      const selectedTag = params['tag']; // Extract the tag parameter
      if (searchTerm) {
        // If searchTerm is provided, search by searchTerm
        this.searchBlogs(searchTerm);
      } else if (selectedTag) {
        // If a tag is provided, filter by tag
        this.searchBlogsByTag(selectedTag);
      }
    });
  }
  searchBlogs(searchTerm: string): void {
    this.blogService.searchBlogs(searchTerm).subscribe(
      (blogs) => {
        this.filteredBlogs = blogs;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = `Error fetching blogs: ${error.message}`;
        console.error('Error fetching blogs:', error);
      }
    );
  }
  searchBlogsByTag(tag: string): void {
    this.blogService.getBlogsByTag(tag).subscribe(
      (blogs: Blog[]) => {
        this.filteredBlogs = blogs;
        this.errorMessage = '';
      },
      (error: { message: any; }) => {
        this.errorMessage = `Error fetching blogs by tag: ${error.message}`;
        console.error('Error fetching blogs by tag:', error);
      }
    );
  }
}