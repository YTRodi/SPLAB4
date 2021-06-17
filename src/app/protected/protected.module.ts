import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Screens
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { DashboardScreenComponent } from './screen/dashboard-screen/dashboard-screen.component';
import { UsersScreenComponent } from './screen/users-screen/users-screen.component';
import { CreateSubjectsScreenComponent } from './screen/create-subjects-screen/create-subjects-screen.component';

@NgModule({
  declarations: [
    HomeScreenComponent,
    DashboardScreenComponent,
    NavbarComponent,
    UsersScreenComponent,
    CreateSubjectsScreenComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, SharedModule],
})
export class ProtectedModule {}
