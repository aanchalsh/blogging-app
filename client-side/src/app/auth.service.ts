// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import {  User } from './user';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedIn: boolean = false;
//   private loggedInUser:boolean=false;
//   private currentUser: any = null;
//   private readonly tokenKey = 'authToken';
//   // constructor(private http: HttpClient) 
//   // { 
//   //   this.isLoggedIn = !!localStorage.getItem(this.tokenKey);
//   //   this.loggedInUser = this.isLoggedIn; }

//   // getLoggedInUser(): any {
//   //   const username = localStorage.getItem('loggedInUsername');
//   //   if (username) {
//   //     const userJson = localStorage.getItem(`user_${username}`);
//   //     if (userJson) {
//   //       const user = JSON.parse(userJson);
//   //       return { username, author: user.author };
//   //     }
//   //   }
//   //   return null;
//   // }
//   private baseUrl = 'http://localhost:8080/blogs';

//   // isAuthenticated(): boolean {
//   //   return !!localStorage.getItem(this.tokenKey);
//   // }
//   // isAuthenticate(): boolean {
//   //   return this.isLoggedIn;
//   // }

//   // isUsernameAvailable(username: string): boolean {
//   //   const existingUsernames = this.getAllUsernames();
//   //   return !existingUsernames.includes(username);
//   // }

//   // private getAllUsernames(): string[] {
//   //   const storedUsernames = Object.keys(localStorage).filter(key => key.startsWith('user_'));
//   //   return storedUsernames.map(key => key.replace('user_', ''));
//   // }
//   // login(username: string, password: string): boolean {
//   //   const storedUserJson = localStorage.getItem(`user_${username}`);
//   //   if (storedUserJson) {
//   //     const token = 'authToken';
//   //     const storedUser = JSON.parse(storedUserJson);
//   //     if (password === storedUser.password) {
//   //       this.isLoggedIn = true;
//   //       this.loggedInUser = true;
//   //       this.currentUser = { username, author: storedUser.author };
//   //       console.log(this.currentUser);
//   //       localStorage.setItem('loggedInUsername', username);
//   //       localStorage.setItem('loggedInAuthorName', storedUser.author);
//   //       const token = 'token'; 
//   //       localStorage.setItem(this.tokenKey, token);
//   //       return true;
//   //     }
//   //   }
//   //   return false;
//   // }

//   // getCurrentUser(): any {
//   //   if (this.isAuthenticated()) {
//   //     if (!this.currentUser) {
//   //       const loggedInUsername = localStorage.getItem('loggedInUsername');
//   //       const loggedInAuthorName = localStorage.getItem('loggedInAuthorName');
  
//   //       if (loggedInUsername && loggedInAuthorName) {
//   //         this.currentUser = { username: loggedInUsername, author: loggedInAuthorName };
//   //       }
//   //     }
//   //     return this.currentUser;
//   //   }
//   //   return null;
//   // }
  

//   // setLoggedInStatus(status: boolean): void {
//   //   this.isLoggedIn = status;
//   // }
//   // getUserBlogs(username: string): any[] {
//   //   const userBlogs = Object.keys(localStorage)
//   //     .filter(key => key.startsWith(`user_${username}_blog_`))
//   //     .map(key => {
//   //       const item = localStorage.getItem(key);
//   //       if (item) {
//   //         return JSON.parse(item);
//   //       }
//   //       return null;
//   //     })
//   //     .filter(blog => blog !== null); 
//   //     console.log(userBlogs);
//   //   return userBlogs;
//   // }
  

//   // logout(): void {
//   //   this.isLoggedIn = false;
//   //   this.loggedInUser=false;
//   //   this.currentUser = null;
//   //   localStorage.removeItem('loggedInUsername');
//   //   localStorage.removeItem('loggedInAuthorName');
//   //   localStorage.removeItem(this.tokenKey);
//   // }

// // signup(username: string, password: string, author: string): boolean {
// //   if (this.isUsernameAvailable(username)) {
// //     const userData = {
// //       username,
// //       password,
// //       author
// //     };
// //     localStorage.setItem(`user_${username}`, JSON.stringify(userData)); 
// //     this.isLoggedIn = true;
// //     return true;
// //   } else {
// //     return false;
// //   }
// // }  
// }
