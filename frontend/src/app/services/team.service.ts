// src/app/services/team.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, TeamDTO } from '../models/team.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  createTeam(team: TeamDTO): Observable<Team> {
    return this.http.post<Team>('/api/teams', team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`/api/teams/${id}`);
  }

  addTeamMember(teamId: number, userId: number): Observable<Team> {
    return this.http.post<Team>(`/api/teams/${teamId}/members/${userId}`, {});
  }

  removeTeamMember(teamId: number, userId: number): Observable<Team> {
    return this.http.delete<Team>(`/api/teams/${teamId}/members/${userId}`);
  }

  getTeamMembers(teamId: number): Observable<User[]> {
    return this.http.get<User[]>(`/api/teams/${teamId}/members`);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('/api/teams');
  }
}