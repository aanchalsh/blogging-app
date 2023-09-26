// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BlogService } from '../blog.service';// Import your BlogService
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-write-blog',
//   templateUrl: './write-blog.component.html',
//   styleUrls: ['./write-blog.component.css']
// })
// export class WriteBlogComponent implements OnInit {
//   blogForm: FormGroup;
//   croppedImage: string | ArrayBuffer | null = null;
//   errorMessage: string | null = null;


//   constructor(
//     private formBuilder: FormBuilder,
//     private blogService: BlogService // Inject your BlogService
//   ) {
//     this.blogForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       author: ['Your Author Name', Validators.required], // Change to your default author
//       tags: ['', Validators.required],
//       content: ['', [Validators.required, Validators.minLength(10)]],
//       file: [null, Validators.required] 
//     });
//   }
//   editorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: 'auto',
//     minHeight: '150px',
//     placeholder: 'Enter text here...',
//     translate: 'no',
//   };
  

//   ngOnInit(): void {
//   }

//   fileChangeEvent(event: any): void {
//     const file: File = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     // Read the selected file as a Base64-encoded string
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       this.croppedImage = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }

//   onSubmit(): void {
//     if (this.blogForm.valid && this.croppedImage) {
//       // Create a FormData object to send the image as a file
//       const formData = new FormData();
//       formData.append('file', this.croppedImage as unknown as Blob);
//       formData.append('blog', JSON.stringify(this.blogForm.value));

//       this.blogService.addBlog(formData).subscribe(
//         (response) => {
//           console.log('Blog post created:', response);
//           // Handle success, e.g., redirect to the newly created blog post
//         },
//         (error) => {
//           console.error('Error creating blog post:', error);
//           this.errorMessage = 'Error creating the blog post.';
//           // Handle error
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
    this.currentUser=localStorage.getItem('username')
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
