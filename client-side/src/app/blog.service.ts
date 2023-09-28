import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError,of } from 'rxjs';
import {  Blog } from './blog';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  getBlogsByAuthor 
    (displayusername: string) {
      throw new Error('Method not implemented.');
  }
  private localStorageKey = 'blogs';
  private recentPhotos: string[] = [];
  isAuthenticatedSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/blogs';
  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();

  
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }
  getPostsById(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${postId}`);
  }

  searchBlogsByTag(tag: string): Observable<Blog[]> {
    const params = new HttpParams().set('tag', tag); 
    return this.http.get<Blog[]>(`${this.baseUrl}/searchByTag`, { params });
  }
  searchBlogs(searchTerm: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}/search`, {
      params: { searchTerm },
    });
  }
  getBlogsByTag(tag: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}/tag/${tag}`);
  }
 
  getUserProfile(author: string): Observable<any> {
    const params = { author }; 
    return this.http.get(`${this.baseUrl}/profile`, { params });
  }

  searchAuthor(author: string): Observable<any> {
    const params = new HttpParams().set('author', author); 
    return this.http.get<Blog[]>(`${this.baseUrl}/searchAuthor`, { params });
  }

  addBlog(blog: Blog): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: headers,
    };
    console.log(options)
    console.log(blog)
    return this.http.post<Blog>(`${this.baseUrl}/writeblog`, blog, options);
  }

  updateBlogPost(id: string, blog: Blog): Observable<Blog> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: headers,
    };
    console.log(options)
    console.log(blog)
    return this.http.put<Blog>(`${this.baseUrl}/editblog/${id}`, blog,options);
  }
  deleteBlog(postId: string): Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const options = {
      headers: headers,
    };
    console.log(options)
    
    return this.http.delete<void>(`${this.baseUrl}/deleteblog/${postId}`,options);
  }
  
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-user`, user)
  }
  
  loginUser(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    this.isAuthenticatedSubject.next(true);
    return this.http.post(`${this.baseUrl}/login`, loginRequest)
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    console.log(!!token) 
    return !!token; 
  }

}