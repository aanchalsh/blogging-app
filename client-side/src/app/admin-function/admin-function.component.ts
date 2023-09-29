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
    // Invert the user's permission locally
    user.canWriteBlog = !user.canWriteBlog;

    // Update the user's permission on the server
    this.adminService.updateCanWriteBlog(user.id, user.canWriteBlog).subscribe(
      () => {
        // The update was successful
      },
      (error) => {
        console.error('Error updating user:', error);
        // If there's an error, revert the local state to its previous value
        user.canWriteBlog = !user.canWriteBlog;
      }
    );
  }
  
}