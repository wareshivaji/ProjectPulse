import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { User } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  teamForm: FormGroup;
  selectedUsers: User[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<TeamCreateComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[] }
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.teamForm.invalid || this.selectedUsers.length === 0) {
      return;
    }

    this.isLoading = true;
    const teamData = {
      name: this.teamForm.value.name,
      userIds: this.selectedUsers.map(user => user.id)
    };

    this.teamService.createTeam(teamData).subscribe({
      next: () => {
        this.snackBar.open('Team created successfully', 'Close', { duration: 5000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to create team', 'Close', { duration: 5000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  toggleUserSelection(user: User): void {
    const index = this.selectedUsers.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isUserSelected(user: User): boolean {
    return this.selectedUsers.some(u => u.id === user.id);
  }
}