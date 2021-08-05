import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

// Auth routing
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersTableComponent } from './components/tables/users-table/users-table.component';
import { UserDetailComponent } from './components/detail/user-detail/user-detail.component';
import { SubjectFormComponent } from './components/forms/subject-form/subject-form.component';
import { SubjectsTableComponent } from './components/tables/subjects-table/subjects-table.component';
import { SubjectDetailComponent } from './components/detail/subject-detail/subject-detail.component';
import { EmptyCardComponent } from './components/cards/empty-card/empty-card.component';
import { DeletedUsersTableComponent } from './components/tables/deleted-users-table/deleted-users-table.component';
import { ExamFormComponent } from './components/forms/exam-form/exam-form.component';
import { ExamsTableComponent } from './components/tables/exams-table/exams-table.component';
import { ScorePipe } from './pipes/score.pipe';
import { QuarterPipe } from './pipes/quarter.pipe';

@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginFormComponent,
    SpinnerComponent,
    UsersTableComponent,
    UserDetailComponent,
    SubjectFormComponent,
    SubjectsTableComponent,
    SubjectDetailComponent,
    EmptyCardComponent,
    DeletedUsersTableComponent,
    ExamFormComponent,
    ExamsTableComponent,
    ScorePipe,
    QuarterPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [
    SpinnerComponent,
    // Forms
    RegisterFormComponent,
    LoginFormComponent,
    SubjectFormComponent,
    ExamFormComponent,

    // Tables
    UsersTableComponent,
    SubjectsTableComponent,
    DeletedUsersTableComponent,
    ExamsTableComponent,

    // Details
    UserDetailComponent,
    SubjectDetailComponent,

    //Cards,
    EmptyCardComponent,
  ],
})
export class SharedModule {}
