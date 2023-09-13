
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
 
  

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  
    ngOnInit(): void {
      const tag = this.route.snapshot.queryParamMap.get('tag');
      console.log(tag)
      if (tag!==null) {
        this.blogService.searchByTag(tag).subscribe(
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
}

