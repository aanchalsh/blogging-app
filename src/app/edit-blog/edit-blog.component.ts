// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Blog} from '../blog';
// import { BlogService } from '../blog.service';

// @Component({
//   selector: 'app-edit-blog',
//   templateUrl: './edit-blog.component.html',
//   styleUrls: ['./edit-blog.component.css']
// })
// export class EditBlogComponent implements OnInit {
//   blogForm!: FormGroup;
//   errorMessage: string = '';
//   blog: Blog | null = null;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute,
//     private blogService: BlogService
//   ) { }

//   ngOnInit(): void {
//     // Retrieve the blog's title from the route parameters
//     this.route.paramMap.subscribe((params) => {
//       const postId = params.get('id');
//       console.log(postId)
//       if (postId) {
//         this.blogService.getPostsById(postId).subscribe(
//           (data) => {
//             this.blog = data;
//           },
//           (error) => {
//             console.error('Error fetching blog post:', error);
//           }
//         );
//       }
//       if (this.blog) {
//         this.initializeForm();
//         console.log(this.blog)
//       }
//     });
   
//   }

//   private initializeForm() {
//     this.blogForm = this.formBuilder.group({
//       title: [this.blog!.title, Validators.required],
//       author: [this.blog!.author, Validators.required],
//       tags: [this.blog!.tags.join(','), Validators.required],
//       content: [this.blog!.content, [Validators.required, Validators.minLength(10)]],
//       imageUrl: [this.blog!.imageUrl, [Validators.required, Validators.pattern('^(http|https)://.*$')]],
//     });
//   }

//   get formControls() {
//     return this.blogForm.controls;
//   }
//   onSubmit(): void {
//     if (this.blogForm.valid && this.blog) {
//       const editedId = this.blogForm.value.id;
//       const allBlogs = this.blogService.getAllPosts();
//         const updatedBlog: Blog = {
//           title: this.blogForm.value.id,
//           author: this.blogForm.value.author,
//           tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()),
//           content: this.blogForm.value.content,
//           date: this.blog.date,
//           imageUrl: this.blogForm.value.imageUrl,
//         };

//         this.blogService.updateBlogPost(this.blog.id, updatedBlog);
//         this.router.navigate(['/posts', updatedBlog.id]);
//       }
//     } 
//   }



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
  blogForm: FormGroup; // Define a FormGroup for the form
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
    private formBuilder: FormBuilder, // Inject the FormBuilder
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      tags: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('(http|https)://.+')]] // Validate URL pattern
    });
  }

  ngOnInit(): void {
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
        author: this.blogForm.value.author,
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
      // Form is invalid, display an error message
      this.errorMessage = 'Please fill out all required fields and provide a valid image URL.';
    }
  }
}
