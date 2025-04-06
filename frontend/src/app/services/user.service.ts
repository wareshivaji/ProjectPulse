// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  updateProfile(profileData: any): Observable<User> {
    return this.http.put<User>('/api/users/profile', profileData);
  }

  changeUserRole(userId: number, newRole: string): Observable<User> {
    return this.http.put<User>(`/api/users/${userId}/change-role`, { newRole });
  }
}