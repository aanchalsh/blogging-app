import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {  Blog } from './blog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private localStorageKey = 'blogs';
  private recentPhotos: string[] = [];

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/blogs';

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }
  getPostsById(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${postId}`);
  }
  searchByTag(tag: string): Observable<any> {
    const params = { tag }; 
    return this.http.get(`${this.baseUrl}/searchByTag`, { params });
  }
  searchByAuthor(author: string): Observable<any> {
    const params = { author }; 
    return this.http.get(`${this.baseUrl}/profile`, { params });
  }

  addBlog(blog: Blog): Observable<any> { 
    return this.http.post<Blog>(`${this.baseUrl}/posts`, blog);
  }

  // getBlogsByAuthor(author: string): Observable<Blog[]> { 
  //   return this.getAllPosts().pipe( 
  //     map((blogs: Blog[]) => blogs.filter(blog => blog.author.includes(author)))
  //   );
  // }

  updateBlogPost(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.baseUrl}/posts/${id}`, blog);
  }
  deleteBlog(postId: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/posts/${postId}`);
  }

  getBlogsByTag(tag: string): Observable<Blog[]> { 
    return this.getAllPosts().pipe( 
      map((blogs: Blog[]) => blogs.filter(blog => blog.author.includes(tag)))
    );
  }


  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  loginUser(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginRequest);
  }

  // getBlogsByAuthor(author: string): Blog[] {
  //   const allBlogs = this.getAllPosts();
  //   const filteredBlogs = allBlogs.filter((blog: Blog) => blog.author.includes(author));
  //   console.log('Filtered Blogs:', filteredBlogs);
  //   return filteredBlogs;

  // }

  // getBlogByTitle(title: string): Blog | null {
  //   const allBlogs = this.getAllBlogsFromLocalStorage();
  //   return allBlogs.find((blog: Blog) => blog.title === title) || null;
  // }

  

  // getBlogsByTag(tag: string): Blog[] {
  //   const allBlogs = this.getAllPosts();
  //   const filteredBlogs = allBlogs.filter((blog: Blog) => blog.tags.includes(tag));
  //   console.log('Filtered Blogs:', filteredBlogs);
  //   return filteredBlogs;

  // }
  

  // updateFilteredBlogs(tag: string): void {
  //   const allBlogs = this.getAllBlogsFromLocalStorage();
  //   const filteredBlogs = allBlogs.filter((blog: Blog) => blog.tags.includes(tag));
  //   localStorage.setItem('filteredBlogs', JSON.stringify(filteredBlogs));
  // }

  // getAllBlogsFromLocalStorage(): Blog[] {
  //   return [
  //     ...JSON.parse(localStorage.getItem('blogs') || '[]'),
  //     ...JSON.parse(localStorage.getItem('featuredBlogs') || '[]'),
  //     ...JSON.parse(localStorage.getItem('filteredBlogs') || '[]')
  //   ];
  // }

  // private getBlogsFromLocalStorage(): Blog[] {
  //   return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  // }

  // private saveBlogsToLocalStorage(blogs: Blog[]): void {
  //   localStorage.setItem(this.localStorageKey, JSON.stringify(blogs));
  // }
  // private saveUserBlogs(author: string, blogs: Blog[]): void {
  //   localStorage.setItem(`user_${author}_blogs`, JSON.stringify(blogs));
  // }

  // getUserBlogs(author: string): Blog[] {
  //   const storedBlogs = JSON.parse(localStorage.getItem(`user_${author}_blogs`) || '[]');
  //   return storedBlogs;
  // }
  // deleteBlog(title: string): void {
  //   try {
  //     console.log('Deleting blog by title:', title);
  //     const savedBlogs = this.getBlogsFromLocalStorage();

  //     // Find the index of the blog with the matching title
  //     const index = savedBlogs.findIndex((blog: Blog) => blog.title === title);

  //     if (index !== -1) {
  //       // Remove the blog from the array
  //       savedBlogs.splice(index, 1);

  //       // Save the updated blogs array back to local storage
  //       this.saveBlogsToLocalStorage(savedBlogs);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting blog:', error);
  //   }
  // }
  // editBlogByTitle(title: string, updatedBlog: Blog): void {
  //   try {
  //     console.log('Editing blog by title:', title);
  //     const savedBlogs = this.getBlogsFromLocalStorage();

  //     // Find the index of the blog with the matching title
  //     const index = savedBlogs.findIndex((blog: Blog) => blog.title === title);

  //     if (index !== -1) {
  //       // Update the blog with the updatedBlog data
  //       savedBlogs[index] = updatedBlog;

  //       // Save the updated blogs array back to local storage
  //       this.saveBlogsToLocalStorage(savedBlogs);
  //     }
  //   } catch (error) {
  //     console.error('Error editing blog:', error);
  //   }
  // }
}