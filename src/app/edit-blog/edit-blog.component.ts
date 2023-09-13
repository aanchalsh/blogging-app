import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blogs} from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm!: FormGroup;
  errorMessage: string = '';
  blog: Blogs | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    // Retrieve the blog's title from the route parameters
    const title = this.route.snapshot.params['title'];

    // Retrieve the blog's data based on the title
    this.blog = this.blogService.getBlogByTitle(title);

    if (this.blog) {
      this.initializeForm();
    }
  }

  private initializeForm() {
    this.blogForm = this.formBuilder.group({
      title: [this.blog!.title, Validators.required],
      author: [this.blog!.author, Validators.required],
      tags: [this.blog!.tags.join(','), Validators.required],
      content: [this.blog!.content, [Validators.required, Validators.minLength(10)]],
      imageUrl: [this.blog!.imageUrl, [Validators.required, Validators.pattern('^(http|https)://.*$')]],
    });
  }

  get formControls() {
    return this.blogForm.controls;
  }
  onSubmit(): void {
    if (this.blogForm.valid && this.blog) {
      const editedTitle = this.blogForm.value.title;
      const allBlogs = this.blogService.getAllBlogsFromLocalStorage();

      const titleConflict = allBlogs.some((blog: Blogs) => {
        return blog.title === editedTitle && blog.title !== this.blog!.title;
      });

      if (titleConflict) {

        this.errorMessage = 'A blog with this title already exists.';
      } else {

        const updatedBlog: Blogs = {
          title: editedTitle,
          author: this.blogForm.value.author,
          tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()),
          content: this.blogForm.value.content,
          date: this.blog.date,
          imageUrl: this.blogForm.value.imageUrl,
        };

        this.blogService.editBlogByTitle(this.blog.title, updatedBlog);
        this.router.navigate(['/blog', updatedBlog.title]);
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }


}
