import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';

// Auth routing
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [RegisterFormComponent, LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [RegisterFormComponent, LoginFormComponent],
})
export class SharedModule {}
