import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent {
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
      const selectedAuthor = params['author'];
      if (selectedAuthor) {
        // If a tag is provided, filter by tag
      this.searchByAuthor(selectedAuthor);
      }
    })}
    searchByAuthor(author: string): void {
      author=author;
      console.log(author)
      this.blogService.searchAuthor(author).subscribe(
        (blogs: Blog[]) => {
          this.filteredBlogs = blogs;
          this.errorMessage = '';
        },
        (error: { message: any; }) => {
          this.errorMessage = `Error fetching blogs by author: ${error.message}`;
          console.error('Error fetching blogs by author:', error);
        }
      );
    }

}
