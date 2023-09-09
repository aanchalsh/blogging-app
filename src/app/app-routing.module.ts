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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'write-blog',
    component: WriteBlogComponent,
    canActivate: [AuthGuard], data: { requiresAuth: true }
  },

  { path: 'blog/:title', component: BlogDetailComponent },
  { path: 'tag/:tag', component: BlogListComponent },
  { path: 'blog-list/:tag', component: BlogListComponent },
  { path: 'profile', component:ProfileComponent},
  { path: 'edit/:title',component:EditBlogComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
