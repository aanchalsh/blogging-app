import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
 


@Component({
  selector: 'app-admin-function',
  templateUrl: './admin-function.component.html',
  styleUrls: ['./admin-function.component.css']
})
export class AdminFunctionComponent implements OnInit {
  users: any;
  

  constructor(private adminService: AdminService,private router: Router) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  toggleCanWriteBlog(user: any) {
    user.canWriteBlog = !user.canWriteBlog;

    this.adminService.updateCanWriteBlog(user.id, user.canWriteBlog).subscribe(
      () => {
      },
      (error) => {
        console.error('Error updating user:', error);
        user.canWriteBlog = !user.canWriteBlog;
      }
    );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('username');


    this.router.navigate(['admin-login']);
  }
  
}