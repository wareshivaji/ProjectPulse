import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { ERole } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.css']
})
export class UserRoleDialogComponent {
  selectedRole: ERole;  // Explicitly typed as ERole
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: any, roles: ERole[] },
    private dialogRef: MatDialogRef<UserRoleDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.selectedRole = data.user.role.name;
  }

  onSave(): void {
    if (!this.selectedRole) {
      return;
    }

    this.isLoading = true;
    this.userService.changeUserRole(this.data.user.id, this.selectedRole).subscribe({
      next: () => {
        this.snackBar.open('Role updated successfully', 'Close', { duration: 5000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to update role', 'Close', { duration: 5000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}