// src/app/components/projects/project-list/project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { ERole } from 'src/app/models/user.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'team', 'startDate', 'actions'];
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load projects', 'Close', { duration: 5000 });
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  viewProject(id: number): void {
    this.router.navigate(['/projects', id]);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.snackBar.open('Project deleted successfully', 'Close', { duration: 5000 });
          this.loadProjects();
        },
        error: (err) => {
          this.snackBar.open('Failed to delete project', 'Close', { duration: 5000 });
        }
      });
    }
  }

  canCreateProject(): boolean {
    return this.authService.hasRole(ERole.MANAGER) || 
       this.authService.hasRole(ERole.TEAM_LEAD) || 
       this.authService.hasRole(ERole.SR_DEVELOPER);
  }

  canDeleteProject(): boolean {
    return this.authService.hasRole(ERole.MANAGER);
  }
}