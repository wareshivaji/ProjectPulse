import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ERole } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public ERole = ERole; // Make enum available in template

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
  }

  get userInitials(): string {
    if (!this.authService.currentUserValue) return '';
    const user = this.authService.currentUserValue;
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;
  }
}