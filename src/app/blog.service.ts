import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Blogs } from './blog';

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
  getPostsById(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/{postId}`);
  }

  addBlog(blog: Blogs): Observable<any> {
   
    
      return this.http.post<Blogs>(`${this.baseUrl}/posts`, blog);
    
  }

  getBlogByTitle(title: string): Blogs | null {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    return allBlogs.find((blog: Blogs) => blog.title === title) || null;
  }

  getBlogs(): Observable<Blogs[]> {
    return of(this.getAllBlogsFromLocalStorage());
  }
  searchBlogs(query: string): Blogs[] {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blogs) => {
      return (
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    });
    return filteredBlogs;
  }

  

  getBlogsByTag(tag: string): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${this.baseUrl}/tag/${tag}`);
  }
  getBlogsByAuthor(author: string): Blogs[] {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blogs) => blog.author.includes(author));
    console.log('Filtered Blogs:', filteredBlogs);
    return filteredBlogs;

  }

  updateFilteredBlogs(tag: string): void {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blogs) => blog.tags.includes(tag));
    localStorage.setItem('filteredBlogs', JSON.stringify(filteredBlogs));
  }

  getAllBlogsFromLocalStorage(): Blogs[] {
    return [
      ...JSON.parse(localStorage.getItem('blogs') || '[]'),
      ...JSON.parse(localStorage.getItem('featuredBlogs') || '[]'),
      ...JSON.parse(localStorage.getItem('filteredBlogs') || '[]')
    ];
  }

  private getBlogsFromLocalStorage(): Blogs[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  private saveBlogsToLocalStorage(blogs: Blogs[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(blogs));
  }
  private saveUserBlogs(author: string, blogs: Blogs[]): void {
    localStorage.setItem(`user_${author}_blogs`, JSON.stringify(blogs));
  }

  getUserBlogs(author: string): Blogs[] {
    const storedBlogs = JSON.parse(localStorage.getItem(`user_${author}_blogs`) || '[]');
    return storedBlogs;
  }
  deleteBlog(title: string): void {
    try {
      console.log('Deleting blog by title:', title);
      const savedBlogs = this.getBlogsFromLocalStorage();

      // Find the index of the blog with the matching title
      const index = savedBlogs.findIndex((blog: Blogs) => blog.title === title);

      if (index !== -1) {
        // Remove the blog from the array
        savedBlogs.splice(index, 1);

        // Save the updated blogs array back to local storage
        this.saveBlogsToLocalStorage(savedBlogs);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }
  editBlogByTitle(title: string, updatedBlog: Blogs): void {
    try {
      console.log('Editing blog by title:', title);
      const savedBlogs = this.getBlogsFromLocalStorage();

      // Find the index of the blog with the matching title
      const index = savedBlogs.findIndex((blog: Blogs) => blog.title === title);

      if (index !== -1) {
        // Update the blog with the updatedBlog data
        savedBlogs[index] = updatedBlog;

        // Save the updated blogs array back to local storage
        this.saveBlogsToLocalStorage(savedBlogs);
      }
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  }
}