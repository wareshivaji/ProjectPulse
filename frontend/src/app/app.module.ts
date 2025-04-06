import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { TaskStateComponent } from './components/tasks/task-state/task-state.component';
import { TeamManagementComponent } from './components/teams/team-management/team-management.component';
import { UserManagementComponent } from './components/users/user-management/user-management.component';
import { TeamCreateComponent } from './components/teams/team-create/team-create.component';
import { UserRoleDialogComponent } from './components/users/user-role-dialog/user-role-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectCreateComponent,
    ProjectDetailsComponent,
    TaskStateComponent,
    TeamManagementComponent,
    UserManagementComponent,
    TeamCreateComponent,
    UserRoleDialogComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
