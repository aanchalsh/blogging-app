"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var write_blog_component_1 = require("./write-blog/write-blog.component");
var blog_detail_component_1 = require("./blog-detail/blog-detail.component");
var blog_list_component_1 = require("./blog-list/blog-list.component");
var login_component_1 = require("./login/login.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'write-blog', component: write_blog_component_1.WriteBlogComponent },
    { path: 'blog/:title', component: blog_detail_component_1.BlogDetailComponent },
    { path: 'tag/:tag', component: blog_list_component_1.BlogListComponent },
    { path: 'blog-list/:tag', component: blog_list_component_1.BlogListComponent },
    { path: 'blogs/tag/:tag', component: blog_list_component_1.BlogListComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
