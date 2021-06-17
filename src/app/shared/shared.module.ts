import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';

// Auth routing
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersTableComponent } from './components/tables/users-table/users-table.component';
import { UserDetailComponent } from './components/detail/user-detail/user-detail.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    UsersTableComponent,
    UserDetailComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    // Tables
    UsersTableComponent,
    // Details
    UserDetailComponent,
  ],
})
export class SharedModule {}
