import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterScreenComponent, LoginScreenComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
