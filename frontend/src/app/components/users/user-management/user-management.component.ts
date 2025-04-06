import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ERole } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleDialogComponent } from '../user-role-dialog/user-role-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  originalUsers: User[] = [];
  isLoading = true;
  roles = Object.values(ERole);

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.originalUsers = [...users];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load users', 'Close', { duration: 5000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (!filterValue) {
      this.users = [...this.originalUsers];
      return;
    }
    this.users = this.originalUsers.filter(user => 
      (user.firstName?.toLowerCase().includes(filterValue) || 
      user.lastName?.toLowerCase().includes(filterValue) ||
      user.email?.toLowerCase().includes(filterValue))
    );
  }

  openRoleDialog(user: User): void {
    const dialogRef = this.dialog.open(UserRoleDialogComponent, {
      width: '400px',
      data: { user, roles: this.roles }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }
}