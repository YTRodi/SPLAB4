import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { DashboardScreenComponent } from './screen/dashboard-screen/dashboard-screen.component';

// ADMIN
import { UsersScreenComponent } from './screen/users-screen/users-screen.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
    children: [
      { path: 'dashboard', component: DashboardScreenComponent },
      {
        path: 'admin',
        children: [{ path: 'users', component: UsersScreenComponent }],
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
