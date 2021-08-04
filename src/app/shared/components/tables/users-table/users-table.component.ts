import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { Types } from 'src/app/constants/types';
import { confirmNotification } from 'src/app/helpers/notifications';
import { Subject } from 'src/app/interfaces/subject.interface';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit, OnChanges {
  @Input() studentsBySubject: Subject | null = null;
  @Input() title: string = 'usuarios';
  @Input() filter: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'ALL' = 'ALL';
  @Output() onSelectUser: EventEmitter<User>;
  public currentUserFromDB: User | null = null;
  public types = Types;
  public userList: Array<any> | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.onSelectUser = new EventEmitter<User>();
  }

  async ngOnInit(): Promise<void> {
    const { currentUserFromDB } = await this.authService.getCurrentUser();
    this.currentUserFromDB = currentUserFromDB;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<any> {
    if (changes.studentsBySubject && changes.studentsBySubject.currentValue) {
      return (this.userList = changes.studentsBySubject.currentValue.students);
    }

    if (changes.filter && changes.filter.currentValue) {
      switch (this.filter) {
        case 'ALL':
          return this.userService
            .getAllUsers()
            .subscribe((userList) => (this.userList = userList));

        case 'STUDENT':
          return (
            await this.userService.getAllUsersByType(this.filter)
          ).subscribe((onlyStudents) => (this.userList = onlyStudents));

        case 'TEACHER':
          return (
            await this.userService.getAllUsersByType(this.filter)
          ).subscribe((onlyTeachers) => (this.userList = onlyTeachers));

        case 'ADMIN':
          return (
            await this.userService.getAllUsersByType(this.filter)
          ).subscribe((onlyAdmins) => (this.userList = onlyAdmins));
      }
    }
  }

  getTitleEmptyCardBystudentsBySubjectFilter() {
    return `No hay alumnos inscriptos a ${this.studentsBySubject?.name}`;
  }

  selectUser(selectedUser: User) {
    this.onSelectUser.emit(selectedUser);
  }

  async onDeleteUser(user: User) {
    const userType =
      user.type === Types.STUDENT
        ? 'alumno'
        : user.type === Types.TEACHER
        ? 'profesor'
        : 'administrador';

    const confirm = await confirmNotification({
      text: `Eliminar ${userType} con email ${user.email}`,
      confirmParams: { title: 'Usuario eliminado con éxito' },
    });

    if (confirm) this.userService.deleteUser(user.uid);
  }
}
