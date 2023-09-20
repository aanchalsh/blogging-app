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
          }
        );
      }
  }
 
}
