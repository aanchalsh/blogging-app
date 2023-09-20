// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { WriteBlogComponent } from './write-blog/write-blog.component';
// import { BlogDetailComponent } from './blog-detail/blog-detail.component';
// import { BlogListComponent } from './blog-list/blog-list.component';
// import { LoginComponent } from './login/login.component';
// import { AuthGuard } from './auth.guard';
// import { ProfileComponent } from './profile/profile.component';
// import { EditBlogComponent } from './edit-blog/edit-blog.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'blogs/posts', pathMatch: 'full' },
//   { path: 'blogs/posts', component: HomeComponent },
//   { path: 'login', component: LoginComponent },

//   {
//     path: 'blogs/writeblog',
//     component: WriteBlogComponent,
//     canActivate: [AuthGuard]
//   },

 
//   { path: 'posts/:id', component: BlogDetailComponent },
//   { path: 'searchByTag', component: BlogListComponent },
//   // { path: 'author', component: BlogListComponent },
//   // { path: 'blog-list/:tag', component: BlogListComponent },
//   { path: 'profile', component:ProfileComponent},
//   { path: 'edit/:id',component:EditBlogComponent},
//   { path: '', redirectTo: '/posts', pathMatch: 'full' },
//   { path: 'posts', component: HomeComponent },
//   { path: 'login', component: LoginComponent },

//   {
//     path: 'write-blog',
//     component: WriteBlogComponent,
//     canActivate: [AuthGuard], data: { requiresAuth: true }
//   },
//   { path: 'blogs/search', component: BlogListComponent },
//   { path: 'search', component:BlogListComponent },
//   { path: 'blogs/title/:title', component: BlogListComponent },
//   { path: 'blogs/author/:author', component: BlogListComponent },
//   { path: 'blog/:title', component: BlogDetailComponent },
//   { path: 'tag/:tag', component: BlogListComponent },
//   { path: 'blogs/tag/:tag', component: BlogListComponent },
//   { path: 'blog-list/:tag', component: BlogListComponent },
//   { path: 'profile', component:ProfileComponent},
//   { path: 'edit/:title',component:EditBlogComponent},
//   { path: 'blog-list', component: BlogListComponent },

// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
const routes: Routes = [
  { path: '', redirectTo: 'blogs/posts', pathMatch: 'full' },
  { path: 'blogs/posts', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'blogs/writeblog',
    component: WriteBlogComponent,
    canActivate: [AuthGuard]
  },
  { path: 'posts/:id', component: BlogDetailComponent },
  { path: 'searchByTag', component: BlogListComponent },
  // { path: 'author', component: BlogListComponent },
  // { path: 'blog-list/:tag', component: BlogListComponent },
  { path: 'profile', component:ProfileComponent},
  { path: 'edit/:id',component:EditBlogComponent},
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'write-blog',
    component: WriteBlogComponent,
    canActivate: [AuthGuard], data: { requiresAuth: true }
  },
  { path: 'blogs/search', component: BlogListComponent },
  { path: 'search', component:BlogListComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/title/:title', component: BlogListComponent },
  { path: 'blogs/author/:author', component: BlogListComponent },
  { path: 'blog/:title', component: BlogDetailComponent },
  { path: 'tag/:tag', component: BlogListComponent },
  { path: 'blogs/tag/:tag', component: BlogListComponent },
  { path: 'blog-list/:tag', component: BlogListComponent },
  { path: 'profile', component:ProfileComponent},
  { path: 'edit/:title',component:EditBlogComponent},
  { path: 'blog-list', component: BlogListComponent },
  {path:'write',component:WriteBlogComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }