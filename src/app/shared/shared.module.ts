import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';

// Auth routing
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersTableComponent } from './components/tables/users-table/users-table.component';

@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    UsersTableComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    UsersTableComponent,
  ],
})
export class SharedModule {}
