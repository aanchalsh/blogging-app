import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
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
  blog: Blog[]=[];
  currentUser: string | null | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) 
  {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        this.currentUser = tokenPayload.sub;
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    //this.currentUser=localStorage.getItem('username')
   
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [this.currentUser,Validators.required],
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
          imageUrl: this.blogForm.value.imageUrl
        };


        this.blogService.addBlog(blog).subscribe(
          (response) => {
            console.log('Blog added successfully:', response);
            this.router.navigate(['/posts',response.id]);
          },
          (error) => {
            console.error('Error adding blog:', error);
          }
        );

      }
    } 
  }

