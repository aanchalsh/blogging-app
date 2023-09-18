import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import {  Blog } from './blog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  getBlogsByAuthor // Properly construct the URL
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
    const params = new HttpParams().set('tag', tag); // Set the 'tag' query parameter
    return this.http.get<Blog[]>(`${this.baseUrl}/searchByTag`, { params });
  }
  
 // blog.service.ts
// search(searchType: string, searchTerm: string): Observable<any[]> {
//   const params = { searchType, searchTerm };
//   return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
// }

//   getBlogsByTag(tag: string): Observable<Blog[]> {
//     return this.http.get<Blog[]>(`${this.baseUrl}/tag/${tag}`);
//   }
//   searchBlogsByTitle(title: string): Observable<Blog[]> {
//     const url = `${this.baseUrl}/searchByTitle?title=${title}`; // Properly construct the URL
//     return this.http.get<Blog[]>(url);
//   }
 
//   searchBlogs(searchTerm: string): Observable<Blog[]> {
//     const url = `${this.baseUrl}/search/${searchTerm}`;
//     return this.http.get<Blog[]>(url);
//   }
//   searchBlogsByAuthor(author: string): Observable<Blog[]> {
//     const url = `${this.baseUrl}/searchByAuthor?author=${author}`; // Properly construct the URL
//     return this.http.get<Blog[]>(url);
//   }
 
  searchByAuthor(author: string): Observable<any> {
    const params = { author }; 
    return this.http.get(`${this.baseUrl}/profile`, { params });
  }

  addBlog(blog: Blog): Observable<any> { 
    return this.http.post<Blog>(`${this.baseUrl}/writeblog`, blog);
  }

  updateBlogPost(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.baseUrl}/editblog/${id}`, blog);
  }
  deleteBlog(postId: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/deleteblog/${postId}`);
  }
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-user`, user);
  }
  loginUser(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    this.isAuthenticatedSubject.next(true);
    return this.http.post(`${this.baseUrl}/login`, loginRequest);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    console.log(!!token) // Change this to match your token storage
    return !!token; // Return true if a token exists, false otherwise
  }
  // fetchCurrentUser(): void {
  //   // Send an HTTP GET request to retrieve the current user's username
  //   this.http.get<string>(`${this.baseUrl}/current-user`).subscribe(
  //     (username: string) => {
  //       this.currentUserSubject.next(username);
  //     },
  //     (error) => {
  //       console.error('Error fetching current user:', error);
  //       // Handle errors here as needed
  //     }
  //   );
  // }

  // getCurrentUser(): string | null {
  //   return this.currentUserSubject.value;
  // }

}