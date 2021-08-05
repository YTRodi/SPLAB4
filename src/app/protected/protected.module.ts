import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
import { StudentInscriptionToSubjectScreenComponent } from './screen/student/student-inscription-to-subject-screen/student-inscription-to-subject-screen.component';
import { MySubjectsScreenComponent } from './screen/student/my-subjects-screen/my-subjects-screen.component';
import { MySubjectsInChargeScreenComponent } from './screen/teacher/my-subjects-in-charge-screen/my-subjects-in-charge-screen.component';
import { DeletedUsersComponent } from './screen/admin/deleted-users/deleted-users.component';
import { ExamsComponent } from './screen/teacher/exams/exams.component';
import { UserEmailDirective } from './pipes/user-email.directive';

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
    StudentInscriptionToSubjectScreenComponent,
    MySubjectsScreenComponent,
    MySubjectsInChargeScreenComponent,
    DeletedUsersComponent,
    ExamsComponent,
    UserEmailDirective,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProtectedModule {}
