// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Blog } from '../blog';
// import { BlogService } from '../blog.service';

// @Component({
//   selector: 'app-write-blog',
//   templateUrl: './write-blog.component.html',
//   styleUrls: ['./write-blog.component.css'],
// })
// export class WriteBlogComponent implements OnInit {
//   blogForm!: FormGroup;
//   errorMessage: string = '';
//   currentUser: string | null = null; // Initialize currentUser as null
//   user: any;
//   author: string = '';
//   canWriteBlog: boolean|undefined; // Set this based on your logic

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private blogService: BlogService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // Get the current user (author) from local storage
//     const username = localStorage.getItem('username');

//     if (username) {
//       // Handle the case where 'username' is not null
//       this.currentUser = username;
//       this.author = this.currentUser;

//       this.blogService.getUserProfile(this.author).subscribe(
//         (data) => {
//           this.user = data;
//           console.log(data);
//         },
//         (error) => {
//           console.error('Error fetching user profile:', error);
//         }
//       );

//       // Initialize the blog form with validators
//       this.blogForm = this.formBuilder.group({
//         title: ['', Validators.required],
//         author: [this.currentUser, Validators.required],
//         tags: ['', Validators.required],
//         content: ['', [Validators.required, Validators.minLength(10)]],
//         imageUrl: [
//           '',
//           [Validators.required, Validators.pattern('^(http|https)://.*$')],
//         ],
//       });

//       // Check if canWriteBlog is false and set the overlay
//       if (!this.canWriteBlog) {
//         document.body.classList.add('overlay');
//       }
//     } else {
//       // Handle the case where 'username' is null
//       // For example, set a default value or show an error message
//       console.error('No username found in local storage.');
//       // You may want to handle this case according to your application's requirements.
//     }
//   }

//   get formControls() {
//     return this.blogForm.controls;
//   }

//   onSubmit(): void {
//     if (this.blogForm.valid) {
//       const blog: Blog = {
//         title: this.blogForm.value.title,
//         author: this.blogForm.value.author,
//         tags: this.blogForm.value.tags
//           .split(',')
//           .map((tag: string) => tag.trim()),
//         content: this.blogForm.value.content,
//         date: new Date().toISOString(),
//         imageUrl: this.blogForm.value.imageUrl,
//       };

//       // Call the blog service to add the blog
//       this.blogService.addBlog(blog).subscribe(
//         (response) => {
//           console.log('Blog added successfully:', response);
//           const newBlogId = response.blogs[response.blogs.length - 1].id;
//           this.router.navigate(['/posts', newBlogId]);
//         },
//         (error) => {
//           console.error('Error adding blog:', error);
//         }
//       );
//     }
//   }
// }
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
  currentUser: string | null = null; // Initialize currentUser as null
  user: any;
  author: string = '';
  canWriteBlog: boolean | undefined; // Set this based on your logic

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    const username = localStorage.getItem('username');

    if (username) {
      
      this.currentUser = username;
      this.author = this.currentUser;

      this.canWriteBlog = true; 

      this.blogService.getUserProfile(this.author).subscribe(
        (data) => {
          this.user = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );

      this.blogForm = this.formBuilder.group({
        title: ['', Validators.required],
        author: [this.currentUser, Validators.required],
        tags: ['', Validators.required],
        content: ['', [Validators.required, Validators.minLength(10)]],
        imageUrl: [
          '',
          [Validators.required, Validators.pattern('^(http|https)://.*$')],
        ],
      });

    
      if (!this.canWriteBlog) {
        document.body.classList.add('overlay');
      }
    } else {
      
      console.error('No username found in local storage.');
      
    }
  }

  get formControls() {
    return this.blogForm.controls;
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blog: Blog = {
        title: this.blogForm.value.title,
        author: this.blogForm.value.author,
        tags: this.blogForm.value.tags
          .split(',')
          .map((tag: string) => tag.trim()),
        content: this.blogForm.value.content,
        date: new Date().toISOString(),
        imageUrl: this.blogForm.value.imageUrl,
      };

      
      this.blogService.addBlog(blog).subscribe(
        (response) => {
          console.log('Blog added successfully:', response);
          //const newBlogId = response.blogs[response.blogs.length - 1].id;
          this.router.navigate(['blogs/posts']);
        },
        (error) => {
          console.error('Error adding blog:', error);
          this.errorMessage="User not allowed to write";
        }
      );
    }
  }
}
