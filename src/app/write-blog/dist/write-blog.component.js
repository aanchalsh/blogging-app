"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WriteBlogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var WriteBlogComponent = /** @class */ (function () {
    function WriteBlogComponent(formBuilder, router, blogService, authService, route) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.blogService = blogService;
        this.authService = authService;
        this.route = route;
        this.userBlogs = [];
        var savedAuthorName = localStorage.getItem('signupAuthorName');
        this.blogForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            author: [savedAuthorName || '', forms_1.Validators.required],
            tags: [''],
            content: ['', forms_1.Validators.required],
            imageUrl: ['']
        });
    }
    WriteBlogComponent.prototype.onSubmit = function () {
        if (this.blogForm.valid) {
            var blog = {
                title: this.blogForm.value.title,
                author: this.blogForm.value.author,
                tags: this.blogForm.value.tags.split(',').map(function (tag) { return tag.trim(); }),
                content: this.blogForm.value.content,
                date: new Date().toISOString(),
                imageUrl: this.blogForm.value.imageUrl
            };
            this.blogService.addBlog(blog);
            var storedBlogs = JSON.parse(localStorage.getItem(this.blogForm.value.author) || '[]');
            storedBlogs.push(blog);
            localStorage.setItem(this.blogForm.value.author, JSON.stringify(storedBlogs));
            this.router.navigate(['/blog', blog.title]);
        }
    };
    WriteBlogComponent = __decorate([
        core_1.Component({
            selector: 'app-write-blog',
            templateUrl: './write-blog.component.html',
            styleUrls: ['./write-blog.component.css']
        })
    ], WriteBlogComponent);
    return WriteBlogComponent;
}());
exports.WriteBlogComponent = WriteBlogComponent;
