
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private currentUser: any = null;
  constructor() { }

  getLoggedInUser(): any {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      const userJson = localStorage.getItem(`user_${username}`);
      if (userJson) {
        const user = JSON.parse(userJson);
        return { username, author: user.author };
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isUsernameAvailable(username: string): boolean {
    const existingUsernames = this.getAllUsernames();
    return !existingUsernames.includes(username);
  }

  private getAllUsernames(): string[] {
    const storedUsernames = Object.keys(localStorage).filter(key => key.startsWith('user_'));
    return storedUsernames.map(key => key.replace('user_', ''));
  }
  login(username: string, password: string): boolean {
    const storedUserJson = localStorage.getItem(`user_${username}`);
    if (storedUserJson) {
      const storedUser = JSON.parse(storedUserJson);
      if (password === storedUser.password) {
        this.isLoggedIn = true;
        this.currentUser = { username, author: storedUser.author };
        localStorage.setItem('loggedInUsername', username);
        localStorage.setItem('loggedInAuthorName', storedUser.author);
        return true;
      }
    }
    return false;
  }


  getUserBlogs(username: string): any[] {
    // Assuming your blog data is stored in localStorage
    const userBlogs = Object.keys(localStorage)
      .filter(key => key.startsWith(`user_${username}_blog_`))
      .map(key => {
        const item = localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
        return null;
      })
      .filter(blog => blog !== null); // Remove any null entries
    return userBlogs;
  }
  

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('loggedInUsername');
    localStorage.removeItem('loggedInAuthorName');
  }


  
  signup(username: string, password: string, author: string): boolean {
    if (this.isUsernameAvailable(username)) {
      const userData = {
        password,
        author
      };
      localStorage.setItem(`user_${username}`, JSON.stringify(userData)); // Store user data in local storage
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }
}