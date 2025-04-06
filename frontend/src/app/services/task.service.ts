// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStateTransition } from '../models/task.model';
import {StateType} from '../models/state-type.enum'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  updateTaskState(taskId: number, newState: StateType): Observable<Task> {
    return this.http.put<Task>(`/api/tasks/${taskId}/update-state`, { newState });
  }

  createStateTransition(transition: TaskStateTransition): Observable<TaskStateTransition> {
    return this.http.post<TaskStateTransition>('/api/task-states', transition);
  }

  getAllowedTransitions(fromState: StateType): Observable<StateType[]> {
    return this.http.get<StateType[]>(`/api/task-states/allowed/${fromState}`);
  }
}