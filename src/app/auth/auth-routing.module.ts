import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: 'login', component: LoginScreenComponent },
      { path: 'register', component: RegisterScreenComponent },
      { path: '**', redirectTo: 'register' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
