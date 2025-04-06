import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../../models/project.model';
import { TaskService } from '../../../services/task.service';
import { StateType } from '../../../models/state-type.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskStateTransition } from '../../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-state',
  templateUrl: './task-state.component.html',
  styleUrls: ['./task-state.component.css']
})
export class TaskStateComponent implements OnInit {
  project: Project;
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  completedTasks: any[] = [];
  stateForm: FormGroup;
  isCreatingState = false;
  public StateType = StateType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { project: Project },
    private dialogRef: MatDialogRef<TaskStateComponent>,
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.project = data.project;
    this.stateForm = this.fb.group({
      stage: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.organizeTasksByState();
  }

  organizeTasksByState(): void {
    this.todoTasks = this.project.states.filter(task => task.state === StateType.TODO);
    this.inProgressTasks = this.project.states.filter(task => task.state === StateType.IN_PROGRESS);
    this.completedTasks = this.project.states.filter(task => task.state === StateType.COMPLETED);
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task = event.container.data[event.currentIndex];
      const newState = this.getStateType(event.container.id);

      this.taskService.updateTaskState(task.id, newState).subscribe({
        next: () => {
          this.snackBar.open('Task state updated successfully', 'Close', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Failed to update task state', 'Close', { duration: 5000 });
          // Revert the change
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      });
    }
  }

  getStateType(containerId: string): StateType {
    switch (containerId) {
      case 'todo-list': return StateType.TODO;
      case 'in-progress-list': return StateType.IN_PROGRESS;
      case 'completed-list': return StateType.COMPLETED;
      default: return StateType.TODO;
    }
  }

  onCreateState(): void {
    if (this.stateForm.invalid) {
      return;
    }

    this.isCreatingState = true;
    const formValue = this.stateForm.value;

    const transition: TaskStateTransition = {
      fromState: StateType.TODO,
      toState: formValue.stage,
      allowed: true,
      agenda: 'New task created',
      workDescription: formValue.description,
      targetCompletionDate: formValue.date
    };

    this.taskService.createStateTransition(transition).subscribe({
      next: () => {
        this.snackBar.open('Task state created successfully', 'Close', { duration: 3000 });
        this.stateForm.reset();
        this.isCreatingState = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Failed to create task state', 'Close', { duration: 5000 });
        this.isCreatingState = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}