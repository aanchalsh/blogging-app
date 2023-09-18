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
  title: string | null = null;
  author: string | null = null;
  searchTitle: string = '';
  searchResults: Blog[] = [];
  errorMessage: string = '';
  blogs: Blog[] = [];
  searchQuery: string = '';
  searchTerm: string = '';
 
  

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}
 
  ngOnInit(): void {
    const tag = this.route.snapshot.queryParamMap.get('tag');
      console.log(tag)
      if (tag!==null) {
        this.blogService.searchBlogsByTag(tag).subscribe(
          (data) => {
            console.log(data)
            this.filteredBlogs = data;
            console.log(this.filteredBlogs)
          },
          (error) => {
            console.error('Error:', error);
            // Handle the error (e.g., display an error message to the user)
          }
        );
      }
  }
 

//   searchBlogs(): void {
//     if (this.searchTerm.trim()) {
//       this.blogService.searchBlogs(this.searchTerm).subscribe((blogs) => {
//         this.searchResults = blogs;
//       });
//     }
//   }

//   searchBlogsByTitle(title: string): void {
//     this.blogService.searchBlogsByTitle(title).subscribe(
//       (blogs) => {
//         this.filteredBlogs = blogs;
//         this.errorMessage = ''; // Clear any previous error messages
//       },
//       (error) => {
//         this.errorMessage = 'Error fetching blogs by title.';
//         console.error('Error fetching blogs by title:', error);
//       }
//     );
//   }

// searchBlogsByAuthor(author: string): void {
//   this.blogService.searchBlogsByAuthor(author).subscribe((blogs) => {
//     this.filteredBlogs = blogs;
//   });
// }

}
