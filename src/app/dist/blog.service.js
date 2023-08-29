"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BlogService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var BlogService = /** @class */ (function () {
    function BlogService() {
        this.localStorageKey = 'blogs';
    }
    BlogService.prototype.addBlog = function (blog) {
        try {
            console.log('Adding blog:', blog);
            var savedBlogs = this.getBlogsFromLocalStorage();
            savedBlogs.push(blog);
            this.saveBlogsToLocalStorage(savedBlogs);
            console.log('Blog saved successfully.');
        }
        catch (error) {
            console.error('Error saving blog:', error);
        }
    };
    BlogService.prototype.getBlogByTitle = function (title) {
        var allBlogs = this.getAllBlogsFromLocalStorage();
        return allBlogs.find(function (blog) { return blog.title === title; }) || null;
    };
    BlogService.prototype.getBlogs = function () {
        return rxjs_1.of(this.getAllBlogsFromLocalStorage());
    };
    BlogService.prototype.searchBlogs = function (query) {
        var allBlogs = this.getAllBlogsFromLocalStorage();
        var filteredBlogs = allBlogs.filter(function (blog) {
            return (blog.title.toLowerCase().includes(query.toLowerCase()) ||
                blog.content.toLowerCase().includes(query.toLowerCase()) ||
                blog.tags.some(function (tag) { return tag.toLowerCase().includes(query.toLowerCase()); }));
        });
        return filteredBlogs;
    };
    BlogService.prototype.deleteBlog = function (title) {
        var savedBlogs = this.getAllBlogsFromLocalStorage();
        var updatedBlogs = savedBlogs.filter(function (blog) { return blog.title !== title; });
        this.saveBlogsToLocalStorage(updatedBlogs);
    };
    BlogService.prototype.getBlogsByTag = function (tag) {
        var allBlogs = this.getAllBlogsFromLocalStorage();
        var filteredBlogs = allBlogs.filter(function (blog) { return blog.tags.includes(tag); });
        console.log('Filtered Blogs:', filteredBlogs);
        return filteredBlogs;
    };
    BlogService.prototype.getBlogsByAuthor = function (username) {
        var allBlogs = this.getAllBlogsFromLocalStorage();
        var filteredBlogs = allBlogs.filter(function (blog) { return blog.author.includes(username); });
        console.log('Filtered Blogs:', filteredBlogs);
        return filteredBlogs;
    };
    BlogService.prototype.updateFilteredBlogs = function (tag) {
        var allBlogs = this.getAllBlogsFromLocalStorage();
        var filteredBlogs = allBlogs.filter(function (blog) { return blog.tags.includes(tag); });
        localStorage.setItem('filteredBlogs', JSON.stringify(filteredBlogs));
    };
    BlogService.prototype.getAllBlogsFromLocalStorage = function () {
        return __spreadArrays(JSON.parse(localStorage.getItem('blogs') || '[]'), JSON.parse(localStorage.getItem('featuredBlogs') || '[]'), JSON.parse(localStorage.getItem('filteredBlogs') || '[]'));
    };
    BlogService.prototype.getBlogsFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    };
    BlogService.prototype.saveBlogsToLocalStorage = function (blogs) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(blogs));
    };
    BlogService.prototype.saveUserBlogs = function (author, blogs) {
        localStorage.setItem("user_" + author + "_blogs", JSON.stringify(blogs));
    };
    BlogService.prototype.getUserBlogs = function (author) {
        var storedBlogs = JSON.parse(localStorage.getItem("user_" + author + "_blogs") || '[]');
        return storedBlogs;
    };
    BlogService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
