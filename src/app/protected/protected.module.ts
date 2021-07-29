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
import { UsersScreenComponent } from './screen/admin/users-screen/users-screen.component';
import { CreateSubjectsScreenComponent } from './screen/admin/create-subjects-screen/create-subjects-screen.component';
import { InscriptionToSubjectScreenComponent } from './screen/admin/inscription-to-subject-screen/inscription-to-subject-screen.component';
import { ListSubjectsComponent } from './screen/admin/list-subjects/list-subjects.component';
import { ListUsersComponent } from './screen/admin/list-users/list-users.component';

@NgModule({
  declarations: [
    HomeScreenComponent,
    DashboardScreenComponent,
    NavbarComponent,
    UsersScreenComponent,
    CreateSubjectsScreenComponent,
    InscriptionToSubjectScreenComponent,
    ListSubjectsComponent,
    ListUsersComponent,
  ],
  imports: [CommonModule, ProtectedRoutingModule, SharedModule],
})
export class ProtectedModule {}
