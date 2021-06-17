import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

// Auth routing
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersTableComponent } from './components/tables/users-table/users-table.component';
import { UserDetailComponent } from './components/detail/user-detail/user-detail.component';
import { SubjectFormComponent } from './components/forms/subject-form/subject-form.component';
import { SubjectsTableComponent } from './components/tables/subjects-table/subjects-table.component';
import { SubjectDetailComponent } from './components/detail/subject-detail/subject-detail.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    UsersTableComponent,
    UserDetailComponent,
    SubjectFormComponent,
    SubjectsTableComponent,
    SubjectDetailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [
    SpinnerComponent,
    // Forms
    RegisterFormComponent,
    LoginFormComponent,
    SubjectFormComponent,

    // Tables
    UsersTableComponent,
    SubjectsTableComponent,
    // Details
    UserDetailComponent,
    SubjectDetailComponent,
  ],
})
export class SharedModule {}
