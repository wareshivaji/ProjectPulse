import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { User, ERole } from '../models/user.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data', error);
      return null;
    }
  }

  private storeUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<{ token: string, user: User }>(
      `${this.API_URL}/api/auth/login`,
      body.toString(),
      { 
        headers,
        withCredentials: true // Important for session/cookie based auth
      }
    ).pipe(
      tap(response => {
        if (response?.token) {
          const user = {
            ...response.user,
            token: response.token
          };
          this.storeUser(user);
        }
      }),
      map(response => response.user),
      catchError(error => {
        let errorMessage = 'Login failed. Please check your credentials.';
        if (error.error) {
          if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.status === 403) {
            errorMessage = 'Invalid credentials or insufficient permissions';
          }
        }
        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Transform role to match Spring Boot enum
    const requestBody = {
      ...userData,
      role: userData.role // Already in correct format from component
    };

    return this.http.post<{ user: User, token: string }>(
      `${this.API_URL}/api/auth/register`,
      requestBody,
      { headers }
    ).pipe(
      tap(response => {
        if (response?.token && response?.user) {
          const user = {
            ...response.user,
            token: response.token
          };
          this.storeUser(user);
        }
      }),
      map(response => response.user),
      catchError(error => {
        let errorMessage = 'Registration failed. Please try again.';
        if (error.error) {
          if (error.error.error) { // Handle Spring error response
            errorMessage = error.error.error;
          } else if (error.error.errors) {
            errorMessage = Object.values(error.error.errors).join('\n');
          }
        }
        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Optional: Add JWT expiration check here
    return true;
  }

  hasRole(role: ERole): boolean {
    if (!this.currentUserValue) return false;
    return this.currentUserValue.role?.name === role;
  }

  updateCurrentUser(updates: Partial<User>): void {
    const currentUser = this.currentUserValue;
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    const updatedUser = {
      ...currentUser,
      ...updates
    };

    this.storeUser(updatedUser);
  }

  autoLogin(): void {
    const user = this.getStoredUser();
    if (user?.token) {
      this.currentUserSubject.next(user);
    }
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<{ token: string }>(
      `${this.API_URL}/api/auth/refresh`,
      {},
      { headers }
    ).pipe(
      map(response => {
        if (response?.token && this.currentUserValue) {
          const updatedUser = {
            ...this.currentUserValue,
            token: response.token
          };
          this.storeUser(updatedUser);
          return response.token;
        }
        throw new Error('Token refresh failed');
      })
    );
  }
}
