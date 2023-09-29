import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
 


@Component({
  selector: 'app-admin-function',
  templateUrl: './admin-function.component.html',
  styleUrls: ['./admin-function.component.css']
})
export class AdminFunctionComponent implements OnInit {
  users: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Load all users (excluding admin) on component initialization
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
    // Toggle the 'canWriteBlog' permission for the selected user
    this.adminService.updateCanWriteBlog(user.id, !user.canWriteBlog).subscribe(
      () => {
        // Update the local user object with the new permission
        user.canWriteBlog = !user.canWriteBlog;
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}