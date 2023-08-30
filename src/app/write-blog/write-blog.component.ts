
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent {

  blogForm!: FormGroup;
  userBlogs: any[] = [];
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private route:ActivatedRoute
  ) {
    const savedAuthorName = localStorage.getItem('signupAuthorName');
   
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [savedAuthorName || '', Validators.required],
      tags: [''],
      content: ['', Validators.required],
      imageUrl: [''] 
    });
   
  }  
 
  onSubmit(): void {
    if (this.blogForm.valid) {
      const blog: Blog = {
        title: this.blogForm.value.title,
        author: this.blogForm.value.author,
        tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()),
        content: this.blogForm.value.content,
        date: new Date().toISOString(),
        imageUrl: this.blogForm.value.imageUrl 
      };

      this.blogService.addBlog(blog);
      const storedBlogs = JSON.parse(localStorage.getItem(this.blogForm.value.author) || '[]');
      storedBlogs.push(blog);
      localStorage.setItem(this.blogForm.value.author, JSON.stringify(storedBlogs));

      this.router.navigate(['/blog', blog.title]);
     
    }
  }
}