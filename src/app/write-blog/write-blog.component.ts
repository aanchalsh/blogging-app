import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';// Import your BlogService

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {
  blogForm: FormGroup;
  croppedImage: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService // Inject your BlogService
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['Your Author Name', Validators.required], // Change to your default author
      tags: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      file: [null, Validators.required] 
    });
  }
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '150px',
    placeholder: 'Enter text here...',
    translate: 'no',
  };
  

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // Read the selected file as a Base64-encoded string
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.croppedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.blogForm.valid && this.croppedImage) {
      // Create a FormData object to send the image as a file
      const formData = new FormData();
      formData.append('file', this.croppedImage as unknown as Blob);
      formData.append('blog', JSON.stringify(this.blogForm.value));

      this.blogService.addBlog(formData).subscribe(
        (response) => {
          console.log('Blog post created:', response);
          // Handle success, e.g., redirect to the newly created blog post
        },
        (error) => {
          console.error('Error creating blog post:', error);
          this.errorMessage = 'Error creating the blog post.';
          // Handle error
        }
      );
    }
  }
}
