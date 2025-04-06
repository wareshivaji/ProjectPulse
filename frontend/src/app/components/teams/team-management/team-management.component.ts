// src/app/components/teams/team-management/team-management.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../models/team.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { TeamCreateComponent } from '../team-create/team-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  teams: Team[] = [];
  users: User[] = [];
  isLoading = true;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTeams();
    this.loadUsers();
  }

  loadTeams(): void {
    this.isLoading = true;
    this.teamService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load teams', 'Close', { duration: 5000 });
      }
    });
  }

  loadUsers(): void {
    // Implement user loading logic if needed
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(TeamCreateComponent, {
      width: '600px',
      data: { users: this.users }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeams();
      }
    });
  }

  deleteTeam(id: number): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe({
        next: () => {
          this.snackBar.open('Team deleted successfully', 'Close', { duration: 5000 });
          this.loadTeams();
        },
        error: (err) => {
          this.snackBar.open('Failed to delete team', 'Close', { duration: 5000 });
        }
      });
    }
  }
}