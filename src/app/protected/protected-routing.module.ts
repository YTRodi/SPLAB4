import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { DashboardScreenComponent } from './screen/dashboard-screen/dashboard-screen.component';

// ADMIN
import { UsersScreenComponent } from './screen/admin/users-screen/users-screen.component';
import { CreateSubjectsScreenComponent } from './screen/admin/create-subjects-screen/create-subjects-screen.component';
import { InscriptionToSubjectScreenComponent } from './screen/admin/inscription-to-subject-screen/inscription-to-subject-screen.component';
import { ListSubjectsComponent } from './screen/admin/list-subjects/list-subjects.component';
import { ListUsersComponent } from './screen/admin/list-users/list-users.component';

// STUDENT
import { StudentInscriptionToSubjectScreenComponent } from './screen/student/student-inscription-to-subject-screen/student-inscription-to-subject-screen.component';
import { MySubjectsScreenComponent } from './screen/student/my-subjects-screen/my-subjects-screen.component';

// TEACHER
import { MySubjectsInChargeScreenComponent } from './screen/teacher/my-subjects-in-charge-screen/my-subjects-in-charge-screen.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
    children: [
      { path: 'dashboard', component: DashboardScreenComponent },

      {
        path: 'admin',
        children: [
          { path: 'users', component: UsersScreenComponent },
          { path: 'create-subject', component: CreateSubjectsScreenComponent },
          {
            path: 'incription-to-subject',
            component: InscriptionToSubjectScreenComponent,
          },
          { path: 'list-of-subjects', component: ListSubjectsComponent },
          { path: 'list-of-users', component: ListUsersComponent },
        ],
      },
      {
        path: 'student',
        children: [
          {
            path: 'incription-to-subject',
            component: StudentInscriptionToSubjectScreenComponent,
          },
          { path: 'my-subjects', component: MySubjectsScreenComponent },
        ],
      },
      {
        path: 'teacher',
        children: [
          {
            path: 'my-subjects-in-charge',
            component: MySubjectsInChargeScreenComponent,
          },
        ],
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
