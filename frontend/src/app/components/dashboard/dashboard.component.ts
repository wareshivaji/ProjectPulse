// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { AuthService } from '../../services/auth.service';
import { ERole } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentProjects: Project[] = [];
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadRecentProjects();
  }

  loadRecentProjects(): void {
    this.isLoading = true;
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        this.recentProjects = projects.slice(0, 3);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  getUserRole(): ERole | null {
    return this.authService.currentUserValue?.role?.name || null;
  }

  isHR(): boolean {
    return this.getUserRole() === ERole.HR;
  }
}