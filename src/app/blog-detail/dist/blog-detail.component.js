"use strict";
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BlogService } from '../blog.service'; // Import BlogService
// import { Blog } from '../blog'; // Import the Blog interface
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BlogDetailComponent = void 0;
// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.css']
// })
// export class BlogDetailComponent implements OnInit {
//   blog: Blog | null = null; // Initialize as null
//   constructor(
//     private route: ActivatedRoute,
//     private blogService: BlogService // Inject BlogService
//   ) {}
//   ngOnInit(): void {
//     const blogTitle = this.route.snapshot.paramMap.get('title');
//     if (blogTitle) {
//       this.blog = this.blogService.getBlogByTitle(blogTitle);
//     }
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BlogService } from '../blog.service'; // Update the path
// import { Router } from '@angular/router'; // Import the Router
// import { Blog } from '../blog';
// @Component({
//   selector: 'app-blog-detail',
//   templateUrl: './blog-detail.component.html',
//   styleUrls: ['./blog-detail.component.css']
// })
// export class BlogDetailComponent implements OnInit {
//   blog: Blog | null = null;
//   filteredPosts: Blog[] = [];
//   tag: string | null = null;
//   constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {}
//   ngOnInit(): void {
//     const title = this.route.snapshot.paramMap.get('title');
//     if (title) {
//       this.blog = this.blogService.getBlogByTitle(title);
//       this.tag = this.route.snapshot.paramMap.get('tag');
//       if (this.tag) {
//         this.filteredPosts = this.blogService.getBlogsByTag(this.tag);
//       }
//     } else {
//     }
//   }
//   // Function to navigate to a tag route
//   filterByTag(tag: string): void {
//     this.router.navigate(['/tag', tag]);
//   }
var core_1 = require("@angular/core");
var BlogDetailComponent = /** @class */ (function () {
    function BlogDetailComponent(route, router, blogService) {
        this.route = route;
        this.router = router;
        this.blogService = blogService;
        this.blog = null;
    }
    BlogDetailComponent.prototype.ngOnInit = function () {
        var title = this.route.snapshot.paramMap.get('title');
        if (title) {
            this.blog = this.blogService.getBlogByTitle(title);
            if (!this.blog) {
                console.log('Blog not found');
            }
        }
    };
    BlogDetailComponent.prototype.filterByTag = function (tag) {
        this.router.navigate(['/tag', tag]);
    };
    BlogDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-blog-detail',
            templateUrl: './blog-detail.component.html',
            styleUrls: ['./blog-detail.component.css']
        })
    ], BlogDetailComponent);
    return BlogDetailComponent;
}());
exports.BlogDetailComponent = BlogDetailComponent;
