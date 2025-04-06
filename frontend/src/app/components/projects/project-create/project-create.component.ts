// src/app/components/projects/project-create/project-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../models/team.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  teams: Team[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<ProjectCreateComponent>,
    private snackBar: MatSnackBar
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      techStack: [[]],
      teamId: ['', Validators.required],
      startDate: ['', Validators.required]
    });

    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: (err) => {
        this.snackBar.open('Failed to load teams', 'Close', { duration: 5000 });
      }
    });
  }

  addTech(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      const techStack = this.projectForm.get('techStack')?.value || [];
      if (!techStack.includes(value)) {
        techStack.push(value);
        this.projectForm.get('techStack')?.setValue(techStack);
      }
      // Clear the input value
      if (event.input) {
        event.input.value = '';
      }
    }
  }

  removeTech(tech: string): void {
    const techStack = this.projectForm.get('techStack')?.value || [];
    const index = techStack.indexOf(tech);
    if (index >= 0) {
      techStack.splice(index, 1);
      this.projectForm.get('techStack')?.setValue(techStack);
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = this.projectForm.value;

    this.projectService.createProject(formValue).subscribe({
      next: () => {
        this.snackBar.open('Project created successfully', 'Close', { duration: 5000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to create project', 'Close', { duration: 5000 });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}