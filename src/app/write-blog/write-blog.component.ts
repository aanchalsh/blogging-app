import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
  providers:[AuthGuard]
})
export class WriteBlogComponent implements OnInit {
  blogForm!: FormGroup;
  errorMessage: string = '';
  userBlogs: any[] = [];
  showLoginMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) 
  {
    // if (!this.authService.isAuthenticated()) {
    //   this.showLoginMessage = true;
    // }
  }

  ngOnInit(): void {
    // const savedAuthorName = localStorage.getItem('loggedInAuthorName');

    // this.blogForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   author: [savedAuthorName || '', Validators.required],
    //   tags: ['', Validators.required],
    //   content: ['', [Validators.required, Validators.minLength(10)]],
    //   imageUrl: ['', [Validators.required, Validators.pattern('^(http|https)://.*$')]],
    // });
  }

  get formControls() {
    return this.blogForm.controls;
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      // const title = this.blogForm.value.title;
      // if (this.blogService.getBlogByTitle(title)) {
      //   this.errorMessage = 'A blog with this title already exists.';
      // } else {
        const blog: Blog = {
          title: this.blogForm.value.title,
          author: this.blogForm.value.author,
          tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()),
          content: this.blogForm.value.content,
          date: new Date().toISOString(),
          imageUrl: this.blogForm.value.imageUrl
        };

        // Call the service to add the blog
        this.blogService.addBlog(blog).subscribe(
          (response) => {
            console.log('Blog added successfully:', response);
            this.router.navigate(['blogs/posts', blog.title]);
          },
          (error) => {
            console.error('Error adding blog:', error);
          }
        );

        // const storedBlogs = JSON.parse(localStorage.getItem(this.blogForm.value.author) || '[]');
        // storedBlogs.push(blog);
        // localStorage.setItem(this.blogForm.value.author, JSON.stringify(storedBlogs));

        
      }
    } 
  }

