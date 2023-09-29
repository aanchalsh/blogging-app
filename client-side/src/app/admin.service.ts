import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/blogs'; // Update the URL to match your Spring Boot backend

  constructor(private http: HttpClient) { }

  // Initialize Admin User
  initializeAdmin(): Observable<any> {
    return this.http.post(`${this.baseUrl}/initialize-admin`, null);
  }

  // Get All Users (Excluding Admin)
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  // Update User's "Can Write Blog" Permission
  updateCanWriteBlog(userId: number, canWriteBlog: boolean): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('canWriteBlog', canWriteBlog.toString());

    return this.http.post(`${this.baseUrl}/update-can-write-blog`, params);
  }
}

