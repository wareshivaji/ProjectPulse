import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskStateComponent } from '../../tasks/task-state/task-state.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateType } from '../../../models/state-type.enum';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.loadProject(projectId);
  }

  loadProject(id: number): void {
    this.isLoading = true;
    this.projectService.getProject(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load project', 'Close', { duration: 5000 });
      }
    });
  }

  getStateIcon(state: StateType): string {
    switch(state) {
      case StateType.TODO: return 'assignment';
      case StateType.IN_PROGRESS: return 'hourglass_empty';
      case StateType.COMPLETED: return 'check_circle';
      default: return 'help';
    }
  }

  openTaskStateDialog(): void {
    if (!this.project) return;

    const dialogRef = this.dialog.open(TaskStateComponent, {
      width: '800px',
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProject(this.project!.id);
      }
    });
  }
}