import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { TokenExpirationInterceptor } from './token-interceptor.service';
//import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WriteBlogComponent,
    BlogDetailComponent,
    BlogListComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent,
    EditBlogComponent,
    RegistrationComponent,
    AuthorProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenExpirationInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }