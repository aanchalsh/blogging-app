import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
})
export class WriteBlogComponent implements OnInit {
  blogForm!: FormGroup;
  errorMessage: string = '';
  currentUser: string | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the current user (author) from local storage
    this.currentUser = localStorage.getItem('username');

    // Initialize the blog form with validators
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [this.currentUser, Validators.required],
      tags: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern('^(http|https)://.*$')]],
    });
  }

  get formControls() {
    return this.blogForm.controls;
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blog: Blog = {
        title: this.blogForm.value.title,
        author: this.blogForm.value.author,
        tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()),
        content: this.blogForm.value.content,
        date: new Date().toISOString(),
        imageUrl: this.blogForm.value.imageUrl,
      };

      // Call the blog service to add the blog
      this.blogService.addBlog(blog).subscribe(
        (response) => {
          console.log('Blog added successfully:', response);
          const newBlogId = response.blogs[response.blogs.length - 1].id;
          this.router.navigate(['/posts', newBlogId]);
        },
        (error) => {
          console.error('Error adding blog:', error);
        }
      );
    }
  }
}
