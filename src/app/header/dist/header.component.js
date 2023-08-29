"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, blogService, authService) {
        this.router = router;
        this.blogService = blogService;
        this.authService = authService;
        this.isLoggedIn = false;
        this.searchTag = '';
        this.loggedInUser = null;
        this.userBlogs = [];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isLoggedIn = this.authService.isAuthenticated();
        if (this.isLoggedIn) {
            this.loggedInUser = this.authService.getLoggedInUser();
            this.userBlogs = this.blogService.getUserBlogs(this.loggedInUser.username);
        }
    };
    // logout(): void {
    //   this.authService.logout();
    // }
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    };
    HeaderComponent.prototype.searchByTag = function () {
        if (this.searchTag) {
            var blogs = this.blogService.getBlogsByTag(this.searchTag);
            console.log('Blogs by Tag:', blogs);
        }
        else {
            console.log('Blogs by tag not available');
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
