import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Blog, Comment } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private localStorageKey = 'blogs';

  constructor() { }

  addBlog(blog: Blog): void {
    try {
      console.log('Adding blog:', blog);
      const savedBlogs = this.getBlogsFromLocalStorage();
      savedBlogs.push(blog);
      this.saveBlogsToLocalStorage(savedBlogs);
      console.log('Blog saved successfully.');
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  }

  getBlogByTitle(title: string): Blog | null {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    return allBlogs.find((blog: Blog) => blog.title === title) || null;
  }

  getBlogs(): Observable<Blog[]> {
    return of(this.getAllBlogsFromLocalStorage());
  }
  searchBlogs(query: string): Blog[] {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blog) => {
      return (
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    });
    return filteredBlogs;
  }

  deleteBlog(title: string): void {
    const savedBlogs = this.getAllBlogsFromLocalStorage();
    const updatedBlogs = savedBlogs.filter((blog) => blog.title !== title);
    this.saveBlogsToLocalStorage(updatedBlogs);
  }
  getBlogsByTag(tag: string): Blog[] {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blog) => blog.tags.includes(tag));
    console.log('Filtered Blogs:', filteredBlogs);
    return filteredBlogs;

  }
  getBlogsByAuthor(username: string): Blog[] {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blog) => blog.author.includes(username));
    console.log('Filtered Blogs:', filteredBlogs);
    return filteredBlogs;

  }

  updateFilteredBlogs(tag: string): void {
    const allBlogs = this.getAllBlogsFromLocalStorage();
    const filteredBlogs = allBlogs.filter((blog: Blog) => blog.tags.includes(tag));
    localStorage.setItem('filteredBlogs', JSON.stringify(filteredBlogs));
  }

  private getAllBlogsFromLocalStorage(): Blog[] {
    return [
      ...JSON.parse(localStorage.getItem('blogs') || '[]'),
      ...JSON.parse(localStorage.getItem('featuredBlogs') || '[]'),
      ...JSON.parse(localStorage.getItem('filteredBlogs') || '[]')
    ];
  }

  private getBlogsFromLocalStorage(): Blog[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  private saveBlogsToLocalStorage(blogs: Blog[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(blogs));
  }
  private saveUserBlogs(author: string, blogs: Blog[]): void {
    localStorage.setItem(`user_${author}_blogs`, JSON.stringify(blogs));
  }

  getUserBlogs(author: string): Blog[] {
    const storedBlogs = JSON.parse(localStorage.getItem(`user_${author}_blogs`) || '[]');
    return storedBlogs;
  }
}