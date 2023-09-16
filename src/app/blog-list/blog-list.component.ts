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
  selectedSearchType: string = ''; // Default to 'tag', but you can change it as needed

  tag: string | null = null;
  title: string | null = null;
  author: string | null = null;
  searchTitle: string = '';
  searchResults: Blogs[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tag = params['tag'];
      this.title = params['title'];
      this.author=params['author'];

      if (this.tag !== null) {
        this.searchBlogsByTag(this.tag);
      }

      if (this.title !== null) {
        this.searchBlogsByTitle(this.title);
      }
      if (this.author !== null) {
        this.searchBlogsByAuthor(this.author);
      }
    });
  }

  searchBlogsByTag(tag: string): void {
    this.blogService.getBlogsByTag(tag).subscribe((blogs) => {
      this.filteredBlogs = blogs;
    });
  }
  // searchBlogsByAuthor(author: string): void {
  //   this.blogService.searchBlogsByAuthor(author).subscribe((blogs) => {
  //     this.filteredBlogs = blogs;
  //   });
  // }

  searchBlogsByTitle(title: string): void {
    this.blogService.searchBlogsByTitle(title).subscribe(
      (blogs) => {
        this.filteredBlogs = blogs;
        this.errorMessage = ''; // Clear any previous error messages
      },
      (error) => {
        this.errorMessage = 'Error fetching blogs by title.';
        console.error('Error fetching blogs by title:', error);
      }
    );
  }

  searchBlogsByAuthor(author: string): void {
    
    this.blogService.searchBlogsByAuthor(author).subscribe((blogs) => {
      this.filteredBlogs = blogs;
    });
  }
  
  
}
