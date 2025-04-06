// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { TeamManagementComponent } from './components/teams/team-management/team-management.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ERole } from './models/user.model';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'projects', 
    component: ProjectListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'projects/:id', 
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'teams', 
    component: TeamManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ERole.HR] } 
  },
  { 
    path: 'users', 
    component: UserManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [ERole.HR] } 
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }