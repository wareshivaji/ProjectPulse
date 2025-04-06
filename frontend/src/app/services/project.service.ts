// src/app/services/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectDTO } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  createProject(project: ProjectDTO): Observable<Project> {
    return this.http.post<Project>('/api/projects', project);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`/api/projects/${id}`);
  }

  updateProject(id: number, project: ProjectDTO): Observable<Project> {
    return this.http.put<Project>(`/api/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`/api/projects/${id}`);
  }

  getUserProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects/my-projects');
  }
}