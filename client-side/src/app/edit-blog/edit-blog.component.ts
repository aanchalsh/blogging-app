import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  
  blogForm: FormGroup; 
  blog: Blog = {
    title: '',
    author: '',
    date: '',
    content: '',
    tags: [],
    imageUrl: ''
  };
  id: string | null = null;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      tags: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('(http|https)://.+')]] 
    });
  }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.blogService.getPostsById(this.id).subscribe(
        (data: Blog) => {
          this.blog = data;
          this.blogForm.setValue({
            title: this.blog.title,
            author: this.blog.author,
            tags: this.blog.tags.join(', '), 
            content: this.blog.content,
            imageUrl: this.blog.imageUrl
          });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Invalid ID');
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const tagsArray = this.blogForm.value.tags.split(',').map((tag: string) => tag.trim());

      const updatedBlog: Blog = {
        ...this.blog,
        title: this.blogForm.value.title,
        tags: tagsArray,
        content: this.blogForm.value.content,
        imageUrl: this.blogForm.value.imageUrl
      };

      if (this.id) {
        this.blogService.updateBlogPost(this.id, updatedBlog).subscribe(
          () => {
            console.log('Blog updated successfully');
            this.router.navigate(['/posts', this.id]);
          },
          (error) => {
            console.error('Error updating blog:', error);
          }
        );
      } else {
        console.error('Invalid ID');
      }
    } else {
      this.errorMessage = 'Please fill out all required fields and provide a valid image URL.';
    }
  }
}
