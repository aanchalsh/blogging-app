// write-blog.component.ts
import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Croppie from 'croppie'


@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
})
export class WriteBlogComponent implements OnInit {
  blogForm!: FormGroup;
  errorMessage: string = '';
  currentUser: string | null | undefined;
  imageChangedEvent: any = '';
  croppie: Croppie | null=null;
  
  config:any = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
  };
public Editor=ClassicEditor;

  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: 'auto',
  //   minHeight: '200px',
  //   placeholder: 'Enter text here...',
  //   showToolbar: true,
  // };
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    placeholder: 'Enter text here...',
    image: {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', 'imageCrop'],
    },
  };
  @ViewChild('croppieElement')
  croppieElement!: ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('username');
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [this.currentUser, Validators.required],
      tags: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern('^(http|https)://.*$')]],
    });
    this.croppie = new Croppie(this.croppieElement.nativeElement, {
      enableExif: true,
      viewport: { width: 200, height: 200 },
      boundary: { width: 300, height: 300 },
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Display the image in Croppie
        if (this.croppie) {
          this.croppie.bind({
            url: e.target.result,
          });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
openCroppingModal() {
  if (this.croppie) {
    this.croppie.result({ type: 'blob', size: 'original' }).then((result) => {
      if (this.croppie) {
        this.croppie.destroy();
      }
      this.blogForm.controls['imageUrl'].setValue(result);
    });
  }
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
